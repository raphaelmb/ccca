import Checkout from "./application/Checkout";
import CLIController from "./infra/cli/CLIController";
import CLIHandler from "./infra/cli/CLIHandler";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";

const connection = new PgPromiseConnection();
const productData = new ProductDataDatabase(connection);
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const checkout = new Checkout(productData, couponData, orderData);
const handler = new CLIHandler();
new CLIController(handler, checkout);
handler.type("set-cpf 987.654.321-00");
handler.type("add-item 1 1");
handler.type("checkout");
