import { test, expect, vi } from "vitest";
import Checkout from "../../src/application/Checkout";
import CurrencyGatewayRandom from "../../src/infra/gateway/CurrencyGatewayRandom";
import MailerConsole from "../../src/infra/mailer/MailerConsole";
import CurrencyGateway from "../../src/infra/gateway/CurrencyGateway";
import Currencies from "../../src/domain/entities/Currencies";
import ProductData from "../../src/domain/data/ProductData";
import OrderData from "../../src/domain/data/OrderData";
import Product from "../../src/domain/entities/Product";
import CouponData from "../../src/domain/data/CouponData";

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
  const currencies = new Currencies();
  currencies.addCurrency("USD", 2);
  currencies.addCurrency("BRL", 1);
  const currencyGatewayStub = vi
    .spyOn(CurrencyGatewayRandom.prototype, "getCurrencies")
    .mockResolvedValue(currencies);
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
        1: new Product(1, "A", 1000, 100, 30, 10, 3, "BRL"),
        2: new Product(2, "B", 5000, 50, 50, 50, 22, "BRL"),
        3: new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL"),
        4: new Product(4, "D", 100, 100, 30, 10, 3, "USD"),
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
          expire_date: new Date("2023-04-01T10:00:00"),
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
  // expect(mailerSpy).toHaveBeenCalledTimes(1);
  // expect(mailerSpy).toBeCalledWith(
  //   "test@email.com",
  //   "Checkout Success",
  //   "ABCDEF"
  // );
  currencyGatewayStub.mockRestore();
  mailerSpy.mockRestore();
});

test("should place an order with 4 items with different currencies with fake", async () => {
  // const mailerSpy = vi.spyOn(MailerConsole.prototype, "send");
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
    async getProduct(idProduct: number): Promise<Product> {
      const products: { [idProduct: number]: Product } = {
        1: new Product(1, "A", 1000, 100, 30, 10, 3, "BRL"),
        2: new Product(2, "B", 5000, 50, 50, 50, 22, "BRL"),
        3: new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL"),
        4: new Product(4, "D", 100, 100, 30, 10, 3, "USD"),
      };
      return products[idProduct];
    },
  };
  const coupondata: CouponData = {
    async getCoupon(code: string): Promise<any> {
      const coupons: any = {
        VALE20: {
          code: "VALE20",
          percentage: 20,
          expire_date: new Date("2023-04-15T10:00:00"),
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
  const currencygateway: CurrencyGateway = {
    async getCurrencies(): Promise<Currencies> {
      const currencies = new Currencies();
      currencies.addCurrency("USD", 2);
      currencies.addCurrency("BRL", 1);
      return currencies;
    },
  };
  const orderdata: OrderData = {
    async save(order: any): Promise<void> {},
    async getByCpf(cpf: string): Promise<any> {},
    async count(): Promise<number> {
      return 1;
    },
  };
  const checkout = new Checkout(
    productData,
    coupondata,
    orderdata,
    currencygateway
  );
  const output = await checkout.execute(input);
  expect(output.total).toBe(6580);
  // expect(mailerspy).tohavebeencalledtimes(1);
  // expect(mailerspy).tobecalledwith(
  //   "test@email.com",
  //   "checkout success",
  //   "abcdef"
  // );
  // mailerspy.mockrestore();
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
  // const productdata = new productdatadatabase();
  // const coupondata = new coupondatadatabase();
  const productdata: ProductData = {
    async getProduct(idProduct: number): Promise<any> {
      const products: { [idProduct: number]: any } = {
        1: new Product(1, "A", 1000, 100, 30, 10, 3, "BRL"),
        2: new Product(2, "B", 5000, 50, 50, 50, 22, "BRL"),
        3: new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL"),
      };
      return products[idProduct];
    },
  };
  const coupondata: CouponData = {
    async getCoupon(code: string): Promise<any> {
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
  const orderdata: OrderData = {
    async save(order: any): Promise<void> {},
    async getByCpf(cpf: string): Promise<any> {},
    async count(): Promise<number> {
      return 0;
    },
  };
  const checkout = new Checkout(productdata, coupondata, orderdata);
  const output = await checkout.execute(input);
  expect(output.code).toBe("202300000001");
});
