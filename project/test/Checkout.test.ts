import { test, expect } from "vitest";
import Checkout from "../src/Checkout";
import ProductDataDatabase from "../src/ProductDataDatabase";
import CouponDataDatabase from "../src/CouponDataDatabase";
import ProductData from "../src/ProductData";
import CouponData from "../src/CouponData";

test("should place an order with 3 items", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };
  // const productData = new ProductDataDatabase();
  // const couponData = new CouponDataDatabase();
  const productData: ProductData = {
    getProduct: function (idProduct: number): Promise<any> {
      const products: { [idProduct: number]: any } = {
        1: {
          idProduct: 1,
          description: "A",
          price: 1000,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
        },
        2: {
          idProduct: 2,
          description: "B",
          price: 5000,
          width: 50,
          height: 50,
          length: 50,
          weight: 22,
        },
        3: {
          idProduct: 3,
          description: "C",
          price: 30,
          width: 10,
          height: 10,
          length: 10,
          weight: 0.9,
        },
      };
      return products[idProduct];
    },
  };
  const couponData: CouponData = {
    getCoupon: function (code: string): Promise<any> {
      const coupons: any = {
        VALE20: {
          code: "VALE20",
          percentage: 20,
          expire_date: new Date("2022-12-01T10:00:00"),
        },
        VALE20_EXPIRED: {
          code: "VALE20_EXPIRED",
          percentage: 20,
          expire_date: new Date("2022-10-01T10:00:00"),
        },
      };
      return coupons[code];
    },
  };
  const checkout = new Checkout(productData, couponData);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6350);
});
