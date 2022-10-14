import Dimension from "../src/Dimension";
import GetItems from "../src/GetItems";
import Item from "../src/Item";
import ItemRepositoryMemory from "../src/ItemRepositoryMemory";

test("Should get items", async () => {
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(
    new Item(1, "Guitar", 1000, new Dimension(100, 30, 10), 3)
  );
  itemRepository.save(
    new Item(2, "Amplifier", 5000, new Dimension(50, 50, 50), 20)
  );
  itemRepository.save(new Item(3, "Cable", 30, new Dimension(10, 10, 10), 1));
  const getItems = new GetItems(itemRepository);
  const output = await getItems.execute();
  expect(output).toHaveLength(3);
});
