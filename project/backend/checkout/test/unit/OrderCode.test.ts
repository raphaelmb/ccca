import { expect, test } from "vitest";
import OrderCode from "../../src/domain/entities/OrderCode";

test("should create a code for the order", () => {
  const orderCode = new OrderCode(new Date("2023-04-08T10:00:00"), 1);
  expect(orderCode.getValue()).toBe("202300000001");
});

test("should not create a code for the order if sequence is less than zero", () => {
  expect(() => {
    new OrderCode(new Date("2023-04-08T10:00:00"), -1);
  }).toThrowError("Invalid sequence");
});
