import CouponData from "./CouponData";
import { validate } from "./CpfValidator";
import ProductData from "./ProductData";

export default class Checkout {
  constructor(
    readonly productData: ProductData,
    readonly couponData: CouponData
  ) {}

  async execute(input: Input) {
    const isValid = validate(input.cpf);
    if (!isValid) {
      throw new Error("Invalid cpf");
    }
    let freight = 0;
    let total = 0;
    const productsIds: number[] = [];
    for (const item of input.items) {
      if (productsIds.some((idProduct) => idProduct === item.idProduct)) {
        throw new Error("Duplicated product");
      }
      productsIds.push(item.idProduct);
      const product = await this.productData.getProduct(item.idProduct);
      if (product) {
        if (item.quantity <= 0) {
          throw new Error("Quantity must be positive");
        }
        total += parseFloat(product.price) * item.quantity;
        const volume =
          (product.width / 100) *
          (product.height / 100) *
          (product.length / 100);
        const density = parseFloat(product.weight) / volume;
        const itemFreight = 1000 * volume * (density / 100);
        freight += itemFreight >= 10 ? itemFreight : 10;
      } else {
        throw new Error("Product not found");
      }
    }
    if (input.coupon) {
      const coupon = await this.couponData.getCoupon(input.coupon);
      const today = new Date();
      if (coupon && coupon.expire_date.getTime() > today.getTime()) {
        total -= (total * coupon.percentage) / 100;
      }
    }
    total += freight;
    return { total };
  }
}

type Input = {
  cpf: string;
  items: { idProduct: number; quantity: number }[];
  coupon?: string;
};
