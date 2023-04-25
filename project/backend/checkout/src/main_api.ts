import Checkout from "./application/Checkout";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import RestController from "./infra/controller/RestController";
import ZipcodeDataDatabase from "./infra/data/ZipcodeDataDatabase";
import CalculateFreight from "./application/CalculateFreight";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
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
new RestController(httpServer, checkout);

httpServer.listen(3000);
