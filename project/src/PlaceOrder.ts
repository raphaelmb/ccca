import ItemRepository from "./ItemRepository";
import Order from "./Order";
import OrderRepository from "./OrderRepository";

export default class PlaceOrder {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const order = new Order(input.cpf);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.get(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
    await this.orderRepository.save(order);
    const total = order.getTotal();
    return { total };
  }
}

interface Input {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
  coupon?: string;
}

interface Output {
  total: number;
}
