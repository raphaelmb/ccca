import { test, expect, vi } from "vitest";
import Checkout from "../src/Checkout";
import ProductDataDatabase from "../src/ProductDataDatabase";
import CouponDataDatabase from "../src/CouponDataDatabase";
import ProductData from "../src/ProductData";
import CouponData from "../src/CouponData";
import CurrencyGatewayRandom from "../src/CurrencyGatewayRandom";
import MailerConsole from "../src/MailerConsole";
import CurrencyGateway from "../src/CurrencyGateway";
import OrderData from "../src/OrderData";

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
  const orderData: OrderData = {
    async save(order: any): Promise<void> {},
    async getByCpf(cpf: string): Promise<any> {},
    async count(): Promise<number> {
      return 1;
    },
  };
  const checkout = new Checkout(productData, couponData, orderData);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6350);
});

test("should place an order with 4 items with different currencies", async () => {
  const currencyGatewayStub = vi
    .spyOn(CurrencyGatewayRandom.prototype, "getCurrencies")
    .mockResolvedValue({
      USD: 2,
      BRL: 1,
    });
  const mailerSpy = vi.spyOn(MailerConsole.prototype, "send");
  const input = {
    cpf: "987.654.321-00",
    email: "test@email.com",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
      { idProduct: 4, quantity: 1 },
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
          currency: "BRL",
        },
        2: {
          idProduct: 2,
          description: "B",
          price: 5000,
          width: 50,
          height: 50,
          length: 50,
          weight: 22,
          currency: "BRL",
        },
        3: {
          idProduct: 3,
          description: "C",
          price: 30,
          width: 10,
          height: 10,
          length: 10,
          weight: 0.9,
          currency: "BRL",
        },
        4: {
          idProduct: 4,
          description: "D",
          price: 100,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: "USD",
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
  const orderData: OrderData = {
    async save(order: any): Promise<void> {},
    async getByCpf(cpf: string): Promise<any> {},
    async count(): Promise<number> {
      return 1;
    },
  };
  const checkout = new Checkout(productData, couponData, orderData);
  const output = await checkout.execute(input);
  expect(output.total).toBe(6580);
  expect(mailerSpy).toHaveBeenCalledTimes(1);
  expect(mailerSpy).toBeCalledWith(
    "test@email.com",
    "Checkout Success",
    "ABCDEF"
  );
  currencyGatewayStub.mockRestore();
  mailerSpy.mockRestore();
});

test("should place an order with 4 items with different currencies with fake", async () => {
  const mailerSpy = vi.spyOn(MailerConsole.prototype, "send");
  const input = {
    cpf: "987.654.321-00",
    email: "test@email.com",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
      { idProduct: 4, quantity: 1 },
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
          currency: "BRL",
        },
        2: {
          idProduct: 2,
          description: "B",
          price: 5000,
          width: 50,
          height: 50,
          length: 50,
          weight: 22,
          currency: "BRL",
        },
        3: {
          idProduct: 3,
          description: "C",
          price: 30,
          width: 10,
          height: 10,
          length: 10,
          weight: 0.9,
          currency: "BRL",
        },
        4: {
          idProduct: 4,
          description: "D",
          price: 100,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: "USD",
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
  const currencyGateway: CurrencyGateway = {
    async getCurrencies(): Promise<any> {
      return {
        USD: 2,
        BRL: 1,
      };
    },
  };
  const orderData: OrderData = {
    async save(order: any): Promise<void> {},
    async getByCpf(cpf: string): Promise<any> {},
    async count(): Promise<number> {
      return 1;
    },
  };
  const checkout = new Checkout(
    productData,
    couponData,
    orderData,
    currencyGateway
  );
  const output = await checkout.execute(input);
  expect(output.total).toBe(6580);
  expect(mailerSpy).toHaveBeenCalledTimes(1);
  expect(mailerSpy).toBeCalledWith(
    "test@email.com",
    "Checkout Success",
    "ABCDEF"
  );
  mailerSpy.mockRestore();
});

test("should place an order with 3 items with order code", async () => {
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
  const orderData: OrderData = {
    async save(order: any): Promise<void> {},
    async getByCpf(cpf: string): Promise<any> {},
    async count(): Promise<number> {
      return 1;
    },
  };
  const checkout = new Checkout(productData, couponData, orderData);
  const output = await checkout.execute(input);
  console.log(output);
  expect(output.code).toBe("202300000002");
});
