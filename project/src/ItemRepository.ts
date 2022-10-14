import Item from "./Item";

export default interface ItemRepository {
  get(idItem: number): Promise<Item>;
  save(item: Item): Promise<void>;
  list(): Promise<Item[]>;
}
