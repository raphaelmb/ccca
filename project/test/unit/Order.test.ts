import Coupon from "../../src/domain/entity/Coupon";
import Dimension from "../../src/domain/entity/Dimension";
import Item from "../../src/domain/entity/Item";
import Order from "../../src/domain/entity/Order";

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

test("Should create an order with a discount coupon", () => {
  const order = new Order("935.411.347-80");
  order.addItem(new Item(1, "Guitar", 1000), 1);
  order.addItem(new Item(2, "Amplifier", 5000), 1);
  order.addItem(new Item(3, "Cable", 30), 3);
  order.addCoupon(new Coupon("VALE20", 20));
  const total = order.getTotal();
  expect(total).toBe(4872);
});

test("Should create an order with an expired discount coupon", () => {
  const order = new Order("935.411.347-80", new Date("2021-03-10T10:00:00"));
  order.addItem(new Item(1, "Guitar", 1000), 1);
  order.addItem(new Item(2, "Amplifier", 5000), 1);
  order.addItem(new Item(3, "Cable", 30), 3);
  order.addCoupon(new Coupon("VALE20", 20, new Date("2021-03-01T10:00:00")));
  const total = order.getTotal();
  expect(total).toBe(6090);
});

test("Should create an order with 3 items and calculate freight", () => {
  const order = new Order("935.411.347-80");
  order.addItem(new Item(1, "Guitar", 1000, new Dimension(100, 30, 10), 3), 1);
  order.addItem(
    new Item(2, "Amplifier", 5000, new Dimension(50, 50, 50), 20),
    1
  );
  order.addItem(new Item(3, "Cable", 30, new Dimension(10, 10, 10), 1), 3);
  const freight = order.getFreight();
  const total = order.getTotal();
  expect(freight).toBe(260);
  expect(total).toBe(6350);
});

test("Should create an order with 3 items and generate a code following the pattern AAAAPPPPPPPP", () => {
  const order = new Order("935.411.347-80", new Date("2021-03-01T10:00:00"));
  expect(order.code.value).toBe("202100000001");
});
