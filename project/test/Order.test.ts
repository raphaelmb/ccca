import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

test("Should not create an order with an invalid CPF", () => {
  expect(() => new Order("111.111.111-11")).toThrow(new Error("Invalid CPF"));
});

test("Should create an order with 3 items (with description, price and quantity)", () => {
  const order = new Order("935.411.347-80");
  order.addItem(new Item(1, "Guitar", 1000), 1);
  order.addItem(new Item(2, "Amplifier", 5000), 1);
  order.addItem(new Item(3, "Cable", 30), 3);
  const total = order.getTotal();
  expect(total).toBe(6090);
});

test("Should create an order with a discount coupon (percentage over order total)", () => {
  const order = new Order("935.411.347-80");
  order.addItem(new Item(1, "Guitar", 1000), 1);
  order.addItem(new Item(2, "Amplifier", 5000), 1);
  order.addItem(new Item(3, "Cable", 30), 3);
  order.addCoupon(new Coupon("VALE20", 20));
  const total = order.getTotal();
  expect(total).toBe(4872);
});
