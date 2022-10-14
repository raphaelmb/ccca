export default class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expiredDate: Date = new Date()
  ) {}

  calculateDiscount(total: number) {
    return (total * this.percentage) / 100;
  }

  isExpired(today: Date) {
    return today.getTime() > this.expiredDate.getTime();
  }
}
