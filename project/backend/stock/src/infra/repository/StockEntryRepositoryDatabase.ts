import StockEntry from "../../domain/entities/StockEntry";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {
  save(stockEntry: StockEntry): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getByIdProduct(idProduct: number): Promise<StockEntry[]> {
    throw new Error("Method not implemented.");
  }
  clean(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}