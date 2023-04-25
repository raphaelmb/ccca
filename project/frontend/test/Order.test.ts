import Order from "../src/domain/Order";
import Product from "../src/domain/Product";

test("should create an empty order", () => {
  const order = new Order("111.111.111-11");
  expect(order.getTotal()).toBe(0);
});

test("should create an order with 3 items", () => {
  const order = new Order("111.111.111-11");
  order.addItem(new Product(1, "A", 1000));
  order.addItem(new Product(2, "B", 5000));
  order.addItem(new Product(3, "C", 30));
  expect(order.getTotal()).toBe(6030);
});

test("should create an order with same items", () => {
  const order = new Order("111.111.111-11");
  order.addItem(new Product(1, "A", 1000));
  order.addItem(new Product(1, "A", 1000));
  order.addItem(new Product(1, "A", 1000));
  expect(order.getTotal()).toBe(3000);
  expect(order.items).toHaveLength(3);
  expect(order.items[0].quantity).toBe(3);
});
