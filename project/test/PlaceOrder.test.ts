import Dimension from "../src/Dimension";
import Item from "../src/Item";
import ItemRepositoryMemory from "../src/ItemRepositoryMemory";
import OrderRepositoryMemory from "../src/OrderRepositoryMemory";
import PlaceOrder from "../src/PlaceOrder";

test("Should place an order", async () => {
  const itemRepository = new ItemRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const spy = jest.spyOn(orderRepository, "save");
  itemRepository.save(
    new Item(1, "Guitar", 1000, new Dimension(100, 30, 10), 3)
  );
  itemRepository.save(
    new Item(2, "Amplifier", 5000, new Dimension(50, 50, 50), 20)
  );
  itemRepository.save(new Item(3, "Cable", 30, new Dimension(10, 10, 10), 1));
  const placeOrder = new PlaceOrder(itemRepository, orderRepository);
  const input = {
    cpf: "935.411.347-80",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
  };
  const output = await placeOrder.execute(input);
  expect(spy).toBeCalledTimes(1);
  expect(output.total).toBe(6350);
});
