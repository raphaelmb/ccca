import PlaceOrder from "../../src/application/PlaceOrder";
import Coupon from "../../src/domain/entity/Coupon";
import Dimension from "../../src/domain/entity/Dimension";
import Item from "../../src/domain/entity/Item";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

test("Should place an order", async () => {
  const itemRepository = new ItemRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const spy = jest.spyOn(orderRepository, "save");
  itemRepository.save(
    new Item(1, "Guitar", 1000, new Dimension(100, 30, 10), 3)
  );
  itemRepository.save(
    new Item(2, "Amplifier", 5000, new Dimension(50, 50, 50), 20)
  );
  itemRepository.save(new Item(3, "Cable", 30, new Dimension(10, 10, 10), 1));
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
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

test("Should place an order and generate order's code", async () => {
  const itemRepository = new ItemRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const spy = jest.spyOn(orderRepository, "save");
  itemRepository.save(
    new Item(1, "Guitar", 1000, new Dimension(100, 30, 10), 3)
  );
  itemRepository.save(
    new Item(2, "Amplifier", 5000, new Dimension(50, 50, 50), 20)
  );
  itemRepository.save(new Item(3, "Cable", 30, new Dimension(10, 10, 10), 1));
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
  const input = {
    cpf: "935.411.347-80",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2021-03-01T10:00:00"),
  };
  const output = await placeOrder.execute(input);
  expect(spy).toBeCalledTimes(1);
  expect(output.code).toBe("202100000001");
});

test("Should place an order with discount", async () => {
  const itemRepository = new ItemRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const spy = jest.spyOn(orderRepository, "save");
  itemRepository.save(
    new Item(1, "Guitar", 1000, new Dimension(100, 30, 10), 3)
  );
  itemRepository.save(
    new Item(2, "Amplifier", 5000, new Dimension(50, 50, 50), 20)
  );
  itemRepository.save(new Item(3, "Cable", 30, new Dimension(10, 10, 10), 1));
  couponRepository.save(new Coupon("VALE20", 20));
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
  const input = {
    cpf: "935.411.347-80",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: "VALE20",
  };
  const output = await placeOrder.execute(input);
  expect(spy).toBeCalledTimes(1);
  expect(output.total).toBe(5132);
});
