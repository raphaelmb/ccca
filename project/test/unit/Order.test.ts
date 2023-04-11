import { expect, test } from "vitest";
import Order from "../../src/domain/entities/Order";
import Product from "../../src/domain/entities/Product";
import Coupon from "../../src/domain/entities/Coupon";

test("should create an empty order with a valid CPF", () => {
  const order = new Order("987-654-321-00");
  expect(order.getTotal()).toBe(0);
});

test("should not create an empty order with an invalid CPF", () => {
  expect(() => {
    new Order("111.111.111-11");
  }).toThrowError("Invalid cpf");
});

test("should create order with 3 items", () => {
  const order = new Order("987-654-321-00");
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
  order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
  expect(order.getTotal()).toBe(6350);
});

test("should create order with 3 items and a discount coupon", () => {
  const order = new Order("987-654-321-00");
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
  order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
  order.addCoupon(new Coupon("VALE20", 20, new Date("2023-04-15T10:00:00")));
  expect(order.getTotal()).toBe(5132);
});

test("should not create order with negative quantity", () => {
  const order = new Order("987-654-321-00");
  expect(() => {
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 0);
  }).toThrowError("Quantity must be positive");
});

test("should not create order with duplicate item", () => {
  const order = new Order("987-654-321-00");
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  expect(() => {
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  }).toThrowError("Duplicated product");
});

test("should create order with 3 items plus freight", () => {
  const order = new Order("987-654-321-00");
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
  order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
  expect(order.getTotal()).toBe(6350);
});

test("should create order with 3 items with code", () => {
  const order = new Order("987-654-321-00", new Date("2023-04-10T10:00:00"), 1);
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
  order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
  expect(order.getCode()).toBe("202300000001");
});
