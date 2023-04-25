import { expect, test, vi } from "vitest";
import Checkout from "../../src/application/Checkout";
import CouponDataDatabase from "../../src/infra/data/CouponDataDatabase";
import OrderDataDatabase from "../../src/infra/data/OrderDataDatabase";
import ProductDataDatabase from "../../src/infra/data/ProductDataDatabase";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import QueueController from "../../src/infra/queue/QueueControler";
import QueueMemory from "../../src/infra/queue/QueueMemory";
import ZipcodeDataDatabase from "../../src/infra/data/ZipcodeDataDatabase";
import CalculateFreight from "../../src/application/CalculateFreight";

test("should test queue", async () => {
  const queue = new QueueMemory();
  const connection = new PgPromiseConnection();
  const productData = new ProductDataDatabase(connection);
  const couponData = new CouponDataDatabase(connection);
  const orderData = new OrderDataDatabase(connection);
  const zipcodeData = new ZipcodeDataDatabase(connection);
  const calculateFreight = new CalculateFreight(productData, zipcodeData);
  const checkout = new Checkout(
    productData,
    couponData,
    orderData,
    calculateFreight
  );
  const checkoutSpy = vi.spyOn(checkout, "execute");
  new QueueController(queue, checkout);
  const input = {
    cpf: "987.654.321-00",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };
  await queue.publish("checkout", input);
  const returnValue = checkoutSpy.mock.results[0].value;
  expect(returnValue.code).toBe("202300000001");
  expect(returnValue.total).toBe(6370);
  checkoutSpy.mockRestore();
});
