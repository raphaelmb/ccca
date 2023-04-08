import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import Product from "./Product";

export default class Order {
  cpf: Cpf;
  items: Item[];
  couponCode?: string;
  couponPercentage?: number;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.items = [];
  }

  addItem(product: Product, quantity: number) {
    this.items.push(new Item(product.idProduct, product.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired()) {
      this.couponCode = coupon.code;
      this.couponPercentage = coupon.percentage;
    }
  }

  getTotal() {
    let total = 0;
    for (const item of this.items) {
      total += item.getTotal();
    }
    return total;
  }
}
