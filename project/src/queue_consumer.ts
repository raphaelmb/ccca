import amqp from "amqplib";
import ProductDataDatabase from "./ProductDataDatabase";
import CouponDataDatabase from "./CouponDataDatabase";
import Checkout from "./Checkout";
import OrderDataDatabase from "./OrderDataDatabase";

async function init() {
  const connectionQueue = await amqp.connect("amqp://localhost:5672");
  const channel = await connectionQueue.createChannel();
  await channel.assertQueue("checkout", { durable: true });
  await channel.consume("checkout", async (msg: any) => {
    const input = JSON.parse(msg.content.toString());
    try {
      const productData = new ProductDataDatabase();
      const couponData = new CouponDataDatabase();
      const orderData = new OrderDataDatabase();
      const checkout = new Checkout(productData, couponData, orderData);
      const output = await checkout.execute(input);
      console.log(output);
    } catch (error: any) {
      console.log(error.message);
    }
    channel.ack(msg);
  });
}

init();
