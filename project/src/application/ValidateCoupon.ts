import CouponRepository from "../domain/repository/CouponRepository";

export default class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(input: Input): Promise<Output> {
    const coupon = await this.couponRepository.get(input.code);
    const isExpired = coupon.isExpired(input.date);
    return { isExpired };
  }
}

interface Input {
  code: string;
  date: Date;
}

interface Output {
  isExpired: boolean;
}
