import GetItems from "../src/GetItems";
import ItemsRepositoryDatabase from "../src/ItemsRepositoryDatabase";
import ItemsRepositoryMemory from "../src/ItemsRepositoryMemory";
import sinon from "sinon";

test("Should get items", async () => {
  const itemsRepository = new ItemsRepositoryDatabase();
  const getItems = new GetItems(itemsRepository);
  const items = await getItems.execute();
  expect(items).toHaveLength(3);
  expect(items[0].description).toBe("Guitar");
  expect(items[0].price).toBe(1000);
});

test("Should get items with a fake repository", async () => {
  const itemsRepository = new ItemsRepositoryMemory();
  const getItems = new GetItems(itemsRepository);
  const items = await getItems.execute();
  expect(items).toHaveLength(3);
  expect(items[0].description).toBe("Guitar");
  expect(items[0].price).toBe(1000);
});

test("Should get items with a stub", async () => {
  const itemsRepository = new ItemsRepositoryDatabase();
  sinon
    .stub(itemsRepository, "getItems")
    .returns(Promise.resolve([{ description: "Ball", price: 100 }]));
  const getItems = new GetItems(itemsRepository);
  const items = await getItems.execute();
  expect(items).toHaveLength(1);
  expect(items[0].description).toBe("Ball");
  expect(items[0].price).toBe(100);
  sinon.restore();
});

test("Should get items with a spy", async () => {
  const itemsRepository = new ItemsRepositoryDatabase();
  const spy = sinon.spy(itemsRepository, "getItems");
  const getItems = new GetItems(itemsRepository);
  const items = await getItems.execute();
  expect(items).toHaveLength(3);
  sinon.assert.calledOnce(spy);
  sinon.restore();
});

test("Should get items with a mock", async () => {
  const itemsRepository = new ItemsRepositoryDatabase();
  const getItems = new GetItems(itemsRepository);
  const mock = sinon.mock(getItems);
  mock
    .expects("execute")
    .returns(Promise.resolve([{ description: "Ball", price: 100 }]));
  await getItems.execute();
  mock.verify();
  sinon.restore();
});
