import Checkout from "./application/Checkout";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import RestController from "./infra/controller/RestController";
import FreightGatewayHttp from "./infra/gateway/FreightGatewayHttp";
import CatalogGatewayHttp from "./infra/gateway/CatalogGatewayHttp";
import StockGatewayHttp from "./infra/gateway/StockGatewayHttp";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const freightGateway = new FreightGatewayHttp();
const catalogGateway = new CatalogGatewayHttp();
const stockGateway = new StockGatewayHttp();
const checkout = new Checkout(
  catalogGateway,
  couponData,
  orderData,
  freightGateway,
  stockGateway
);
new RestController(httpServer, checkout);

httpServer.listen(3000);
