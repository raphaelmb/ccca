import Connection from "../../database/Connection";
import ItemRepository from "../../../domain/repository/ItemRepository";
import Item from "../../../domain/entity/Item";

export default class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) {}

  get(idItem: number): Promise<Item> {
    throw new Error("Method not implemented.");
  }

  save(item: Item): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async list(): Promise<Item[]> {
    const itemsData = await this.connection.query("select * from item", []);
    const items: Item[] = [];
    for (const itemData of itemsData) {
      items.push(
        new Item(
          itemData.id_item,
          itemData.description,
          parseFloat(itemData.price)
        )
      );
    }
    return items;
  }
}
