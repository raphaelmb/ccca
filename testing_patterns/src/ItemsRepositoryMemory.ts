import ItemsRepository from "./ItemsRepository";

export default class ItemsRepositoryMemory implements ItemsRepository {
  items: any[];

  constructor() {
    this.items = [
      { description: "Guitar", price: 1000 },
      { description: "Guitar", price: 1000 },
      { description: "Guitar", price: 1000 },
    ];
  }

  async getItems(): Promise<any> {
    return this.items;
  }
}
