import { expect, test } from "vitest";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import CalculateFreight from "../../src/application/CalculateFreight";
import ZipcodeData from "../../src/domain/data/ZipcodeData";
import Zipcode from "../../src/domain/entities/Zipcode";
import ZipcodeDataDatabase from "../../src/infra/data/ZipcodeDataDatabase";

test("should simulate the freight of an order without origin and destination zipcode", async () => {
  const connection = new PgPromiseConnection();
  const zipcodeData: ZipcodeData = {
    async get(code: string): Promise<Zipcode | undefined> {
      if (code === "22030060") {
        return new Zipcode("22030060", "", "", -27.5945, -48.5477);
      }
      if (code === "88015600") {
        return new Zipcode("88015600", "", "", -22.9129, -43.2003);
      }
    },
  };
  const calculateFreight = new CalculateFreight(zipcodeData);
  const input = {
    items: [{ volume: 0.03, density: 100, quantity: 1 }],
  };
  const output = await calculateFreight.execute(input);
  expect(output.total).toBe(30);
  await connection.close();
});

test("should simulate the freight of an order with origin and destination zipcode with fake", async () => {
  const zipcodeData: ZipcodeData = {
    async get(code: string): Promise<Zipcode | undefined> {
      if (code === "22030060") {
        return new Zipcode("22030060", "", "", -27.5945, -48.5477);
      }
      if (code === "88015600") {
        return new Zipcode("88015600", "", "", -22.9129, -43.2003);
      }
    },
  };
  const calculateFreight = new CalculateFreight(zipcodeData);
  const input = {
    from: "22030060",
    to: "88015600",
    items: [{ volume: 0.03, density: 100, quantity: 1 }],
  };
  const output = await calculateFreight.execute(input);
  expect(output.total).toBe(22.45);
});

test("should simulate the freight of an order with origin and destination zipcode with database", async () => {
  const connection = new PgPromiseConnection();
  const zipcodeData = new ZipcodeDataDatabase(connection);
  const calculateFreight = new CalculateFreight(zipcodeData);
  const input = {
    from: "22030060",
    to: "88015600",
    items: [{ volume: 0.03, density: 100, quantity: 1 }],
  };
  const output = await calculateFreight.execute(input);
  expect(output.total).toBe(22.45);
  await connection.close();
});
