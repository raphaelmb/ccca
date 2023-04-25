import CalculateFreight from "./application/CalculateFreight";
import Checkout from "./application/Checkout";
import CLIController from "./infra/cli/CLIController";
import CLIHandlerNode from "./infra/cli/CLIHandlerNode";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import ZipcodeDataDatabase from "./infra/data/ZipcodeDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";

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
const handler = new CLIHandlerNode();
new CLIController(handler, checkout);
