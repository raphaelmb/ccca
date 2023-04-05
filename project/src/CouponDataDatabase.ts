import pgp from "pg-promise";
import CouponData from "./CouponData";

export default class CouponDataDatabase implements CouponData {
  async getCoupon(code: string): Promise<any> {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
    const [coupon] = await connection.query(
      "select * from ccat9.coupon where code = $1",
      [code]
    );
    await connection.$pool.end();
    return coupon;
  }
}
