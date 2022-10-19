export default class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expiredDate: Date = new Date()
  ) {}

  isExpired(today: Date) {
    return today.getTime() > this.expiredDate.getTime();
  }
}
