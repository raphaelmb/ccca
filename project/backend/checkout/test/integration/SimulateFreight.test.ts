import { expect, test } from "vitest";
import SimulateFreight from "../../src/application/SimulateFreight";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import ProductDataDatabase from "../../src/infra/data/ProductDataDatabase";

test("should simulate the freight of an order", async () => {
  const connection = new PgPromiseConnection();
  const productData = new ProductDataDatabase(connection);
  const simulateFreight = new SimulateFreight(productData);
  const input = {
    items: [{ idProduct: 1, quantity: 1 }],
  };
  const output = await simulateFreight.execute(input);
  expect(output.total).toBe(30);
  await connection.close();
});
