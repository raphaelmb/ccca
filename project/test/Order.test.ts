import { expect, test } from "vitest";
import Order from "../src/Order";
import Product from "../src/Product";
import Coupon from "../src/Coupon";

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
  expect(order.getTotal()).toBe(6090);
});

test("should create order with 3 items and a discount coupon", () => {
  const order = new Order("987-654-321-00");
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
  order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
  order.addCoupon(new Coupon("VALE20", 20, new Date("2023-04-10T10:00:00")));
  expect(order.getTotal()).toBe(4872);
});
