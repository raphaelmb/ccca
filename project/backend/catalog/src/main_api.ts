import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import RestController from "./infra/controller/RestController";
import GetProduct from "./application/GetProduct";
import GetProducts from "./application/GetProducts";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const productData = new ProductDataDatabase(connection);
const getProduct = new GetProduct(productData);
const getProducts = new GetProducts(productData);
new RestController(httpServer, getProduct, getProducts);

httpServer.listen(3002);
