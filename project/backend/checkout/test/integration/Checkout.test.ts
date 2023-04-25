import { test, expect, vi, beforeEach } from "vitest";
import Checkout from "../../src/application/Checkout";
import CurrencyGatewayRandom from "../../src/infra/gateway/CurrencyGatewayRandom";
import MailerConsole from "../../src/infra/mailer/MailerConsole";
import CurrencyGateway from "../../src/infra/gateway/CurrencyGateway";
import Currencies from "../../src/domain/entities/Currencies";
import ProductData from "../../src/domain/data/ProductData";
import OrderData from "../../src/domain/data/OrderData";
import Product from "../../src/domain/entities/Product";
import CouponData from "../../src/domain/data/CouponData";
import ZipcodeDataDatabase from "../../src/infra/data/ZipcodeDataDatabase";
import ZipcodeData from "../../src/domain/data/ZipcodeData";
import Zipcode from "../../src/domain/entities/Zipcode";
import CalculateFreight from "../../src/application/CalculateFreight";

let checkout: Checkout;

beforeEach(() => {
  const productData: ProductData = {
    async getProduct(idProduct: number): Promise<Product> {
      const products: { [idProduct: number]: Product } = {
        1: new Product(1, "A", 1000, 100, 30, 10, 3, "BRL"),
        2: new Product(2, "B", 5000, 50, 50, 50, 22, "BRL"),
        3: new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL"),
      };
      return products[idProduct];
    },
  };

  const couponData: CouponData = {
    async getCoupon(code: string): Promise<any> {
      const coupons: any = {
        VALE20: {
          code: "VALE20",
          percentage: 20,
          expire_date: new Date("2024-12-01T10:00:00"),
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

  const orderData: OrderData = {
    async save(order: any): Promise<void> {},
    async getByCpf(cpf: string): Promise<any> {},
    async count(): Promise<number> {
      return 1;
    },
    async clean(): Promise<void> {},
  };

  const zipcodeData: ZipcodeData = {
    async get(code: string): Promise<Zipcode | undefined> {
      if (code === "22030060") {
        return new Zipcode("22030060", "", "", -27.5945, -48.5477);
      }
      if (code === "88015600") {
        return new Zipcode("88015600", "", "", -22.9129, -43.2003);
      }
    },
  };
  const calculateFreight = new CalculateFreight(productData, zipcodeData);
  checkout = new Checkout(productData, couponData, orderData, calculateFreight);
});

test("should place an order with 3 items", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(6370);
});

// test("should place an order with 4 items with different currencies", async () => {
//   const currencies = new Currencies();
//   currencies.addCurrency("USD", 2);
//   currencies.addCurrency("BRL", 1);
//   const currencyGatewayStub = vi
//     .spyOn(CurrencyGatewayRandom.prototype, "getCurrencies")
//     .mockResolvedValue(currencies);
//   const input = {
//     cpf: "987.654.321-00",
//     email: "test@email.com",
//     items: [
//       { idProduct: 1, quantity: 1 },
//       { idProduct: 2, quantity: 1 },
//       { idProduct: 3, quantity: 3 },
//       { idProduct: 4, quantity: 1 },
//     ],
//   };
//   const output = await checkout.execute(input);
//   expect(output.total).toBe(6600);
//   currencyGatewayStub.mockRestore();
// });

test("should place an order with 3 items with order code", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };
  const output = await checkout.execute(input);
  expect(output.code).toBe("202300000001");
});

test("should place an order with 3 items with origin and destination zipcode", async () => {
  const input = {
    from: "22030060",
    to: "88015600",
    cpf: "987.654.321-00",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(6307.06);
});
