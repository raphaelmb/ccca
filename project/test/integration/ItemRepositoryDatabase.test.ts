import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";

test("Should return items from database", async () => {
  const connection = new PgPromiseConnectionAdapter();
  const itemRepository = new ItemRepositoryDatabase(connection);
  const items = await itemRepository.list();
  expect(items).toHaveLength(3);
});
