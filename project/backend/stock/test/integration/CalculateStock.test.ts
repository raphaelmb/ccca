import { expect, test } from "vitest";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import StockEntryRepositoryDatabase from "../../src/infra/repository/StockEntryRepositoryDatabase";
import CalculateStock from "../../src/application/CalculateStock";
import IncreateStock from "../../src/application/IncreaseStock";
import DecreaseStock from "../../src/application/DecreaseStock";

test("should calculate a product stock without availability", async () => {
  const connection = new PgPromiseConnection();
  const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
  await stockEntryRepository.clean();
  const calculateSotck = new CalculateStock(stockEntryRepository);
  const idProduct = 1;
  const output = await calculateSotck.execute(idProduct);
  expect(output.total).toBe(0);
  await connection.close();
});

test("should calculate a product stock with availability", async () => {
  const connection = new PgPromiseConnection();
  const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
  await stockEntryRepository.clean();
  const increaseStock = new IncreateStock(stockEntryRepository);
  const input1 = {
    items: [{ idProduct: 1, quantity: 10 }],
  };
  await increaseStock.execute(input1);
  const calculateStock = new CalculateStock(stockEntryRepository);
  const idProduct = 1;
  const output = await calculateStock.execute(idProduct);
  expect(output.total).toBe(10);
  await connection.close();
});

test("should calculate a product stock with availability sold partially", async () => {
  const connection = new PgPromiseConnection();
  const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
  await stockEntryRepository.clean();
  const increaseStock = new IncreateStock(stockEntryRepository);
  const input1 = {
    items: [{ idProduct: 1, quantity: 10 }],
  };
  await increaseStock.execute(input1);
  const input2 = {
    items: [{ idProduct: 1, quantity: 2 }],
  };
  const decreaseStock = new DecreaseStock(stockEntryRepository);
  await decreaseStock.execute(input2);
  const calculateStock = new CalculateStock(stockEntryRepository);
  const idProduct = 1;
  const output = await calculateStock.execute(idProduct);
  expect(output.total).toBe(8);
  await connection.close();
});
