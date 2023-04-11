import { expect, test } from "vitest";
import CouponDataDatabase from "../../src/infra/data/CouponDataDatabase";
import ValidateCoupon from "../../src/application/ValidateCoupon";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";

test("should validate a discount coupon", async () => {
  const connection = new PgPromiseConnection();
  const couponData = new CouponDataDatabase(connection);
  const validateCoupon = new ValidateCoupon(couponData);
  const output = await validateCoupon.execute("VALE20", 1000);
  expect(output.isExpired).toBeFalsy();
  expect(output.discount).toBe(200);
  await connection.close();
});
