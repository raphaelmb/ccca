import express from "express";
import pgp from "pg-promise";
import { validate } from "./CpfValidator";
const app = express();
app.use(express.json());

const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");

// const products = [
//   { idProduct: 1, description: "A", price: 1000 },
//   { idProduct: 2, description: "B", price: 5000 },
//   { idProduct: 3, description: "C", price: 30 },
// ];

// const coupons = [{ code: "VALE20", percentage: 20 }];

app.post("/checkout", async (req, res) => {
  const isValid = validate(req.body.cpf);
  if (!isValid) {
    return res.status(422).json({
      message: "Invalid cpf",
    });
  }
  let freight = 0;
  let total = 0;
  const productsIds: number[] = [];
  for (const item of req.body.items) {
    if (productsIds.some((idProduct) => idProduct === item.idProduct)) {
      return res.status(422).json({
        message: "Duplicated product",
      });
    }
    productsIds.push(item.idProduct);
    // const product = products.find(
    //   (product) => product.idProduct === item.idProduct
    // );
    const [product] = await connection.query(
      "select * from ccat9.product where id_product = $1",
      [item.idProduct]
    );
    if (product) {
      if (item.quantity <= 0) {
        return res.status(422).json({
          message: "Quantity must be positive",
        });
      }
      total += parseFloat(product.price) * item.quantity;
      const volume =
        (product.width / 100) * (product.height / 100) * (product.length / 100);
      const density = parseFloat(product.weight) / volume;
      const itemFreight = 1000 * volume * (density / 100);
      freight += itemFreight >= 10 ? itemFreight : 10;
    } else {
      return res.status(422).json({
        message: "Product not found",
      });
    }
  }
  if (req.body.coupon) {
    // const coupon = coupons.find((coupon) => coupon.code === req.body.coupon);
    const [coupon] = await connection.query(
      "select * from ccat9.coupon where code = $1",
      [req.body.coupon]
    );
    const today = new Date();
    if (coupon && coupon.expire_date.getTime() > today.getTime()) {
      total -= (total * coupon.percentage) / 100;
    }
  }
  total += freight;
  return res.json({ total });
});
app.listen(3000);
