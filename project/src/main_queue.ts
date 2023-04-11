import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import Checkout from "./application/Checkout";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import QueueController from "./infra/queue/QueueControler";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";

async function init() {
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const connection = new PgPromiseConnection();
  const productData = new ProductDataDatabase(connection);
  const couponData = new CouponDataDatabase(connection);
  const orderData = new OrderDataDatabase(connection);
  const checkout = new Checkout(productData, couponData, orderData);
  new QueueController(queue, checkout);
}

init();
