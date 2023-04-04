import amqp from "amqplib";
import { validate } from "./CpfValidator";
import pgp from "pg-promise";

async function init() {
  const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
  const connectionQueue = await amqp.connect("amqp://localhost:5672");
  const channel = await connectionQueue.createChannel();
  await channel.assertQueue("checkout", { durable: true });
  await channel.consume("checkout", async (msg: any) => {
    const input = JSON.parse(msg.content.toString());
    const isValid = validate(input.cpf);
    if (!isValid) {
      console.log("Invalid cpf");
      return;
    }
    let freight = 0;
    let total = 0;
    const productsIds: number[] = [];
    for (const item of input.items) {
      if (productsIds.some((idProduct) => idProduct === item.idProduct)) {
        console.log("Duplicated product");
        return;
      }
      productsIds.push(item.idProduct);
      const [product] = await connection.query(
        "select * from ccat9.product where id_product = $1",
        [item.idProduct]
      );
      if (product) {
        if (item.quantity <= 0) {
          console.log("Quantity must be positive");
          return;
        }
        total += parseFloat(product.price) * item.quantity;
        const volume =
          (product.width / 100) *
          (product.height / 100) *
          (product.length / 100);
        const density = parseFloat(product.weight) / volume;
        const itemFreight = 1000 * volume * (density / 100);
        freight += itemFreight >= 10 ? itemFreight : 10;
      } else {
        console.log("Product not found");
        return;
      }
    }
    if (input.coupon) {
      const [coupon] = await connection.query(
        "select * from ccat9.coupon where code = $1",
        [input.coupon]
      );
      const today = new Date();
      if (coupon && coupon.expire_date.getTime() > today.getTime()) {
        total -= (total * coupon.percentage) / 100;
      }
    }
    total += freight;
    console.log({ total });
    channel.ack(msg);
  });
}

init();
