import { expect, test, vi } from "vitest";
import PgPromiseConnection from "../src/infra/database/PgPromiseConnection";
import ProductDataDatabase from "../src/infra/data/ProductDataDatabase";
import CouponDataDatabase from "../src/infra/data/CouponDataDatabase";
import OrderDataDatabase from "../src/infra/data/OrderDataDatabase";
import Checkout from "../src/application/Checkout";
import CLIController from "../src/infra/cli/CLIController";
import CLIHandlerMemory from "../src/infra/cli/CLIHandlerMemory";

test("should test cli", async () => {
  const connection = new PgPromiseConnection();
  const productData = new ProductDataDatabase(connection);
  const couponData = new CouponDataDatabase(connection);
  const orderData = new OrderDataDatabase(connection);
  const checkout = new Checkout(productData, couponData, orderData);
  const handler = new CLIHandlerMemory();
  const checkoutSpy = vi.spyOn(checkout, "execute");
  new CLIController(handler, checkout);
  await handler.type("set-cpf 987.654.321-00");
  await handler.type("add-item 1 1");
  await handler.type("checkout");
  const returnValue = checkoutSpy.mock.results[0].value;
  expect(returnValue.code).toBe("202300000001");
  expect(returnValue.total).toBe(1030);
  checkoutSpy.mockRestore();
});
