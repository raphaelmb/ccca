import { expect, test } from "vitest";
import Coupon from "../../src/domain/entities/Coupon";

test("should test coupon", () => {
  const coupon = new Coupon("VALE20", 20, new Date("2023-05-15T10:00:00"));
  expect(coupon.isExpired()).toBeFalsy();
  expect(coupon.getDiscount(1000)).toBe(200);
});
