import { test, expect, vi, beforeEach } from "vitest";
import Checkout from "../../src/application/Checkout";
import ProductData from "../../src/domain/data/ProductData";
import OrderData from "../../src/domain/data/OrderData";
import Product from "../../src/domain/entities/Product";
import CouponData from "../../src/domain/data/CouponData";
import FreightGatewayHttp from "../../src/infra/gateway/FreightGatewayHttp";
import CatalogGatewayHttp from "../../src/infra/gateway/CatalogGatewayHttp";
import Currencies from "../../src/domain/entities/Currencies";
import CurrencyGatewayRandom from "../../src/infra/gateway/CurrencyGatewayRandom";
import StockGatewayHttp from "../../src/infra/gateway/StockGatewayHttp";

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

  const freightGateway = new FreightGatewayHttp();
  const catalogGateway = new CatalogGatewayHttp();
  const stockGateway = new StockGatewayHttp();
  checkout = new Checkout(
    catalogGateway,
    couponData,
    orderData,
    freightGateway,
    stockGateway
  );
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

test("should place an order with 4 items with different currencies", async () => {
  const currencies = new Currencies();
  currencies.addCurrency("USD", 2);
  currencies.addCurrency("BRL", 1);
  const currencyGatewayStub = vi
    .spyOn(CurrencyGatewayRandom.prototype, "getCurrencies")
    .mockResolvedValue(currencies);
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
  const output = await checkout.execute(input);
  expect(output.total).toBe(6600);
  currencyGatewayStub.mockRestore();
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
