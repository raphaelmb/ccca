import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import RestController from "./infra/controller/RestController";
import StockEntryRepositoryDatabase from "./infra/repository/StockEntryRepositoryDatabase";
import CalculateStock from "./application/CalculateStock";
import IncreateStock from "./application/IncreaseStock";
import DecreaseStock from "./application/DecreaseStock";
import CleanStock from "./application/CleanStock";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
const calculateStock = new CalculateStock(stockEntryRepository);
const increaseStock = new IncreateStock(stockEntryRepository);
const decreaseStock = new DecreaseStock(stockEntryRepository);
const cleanStock = new CleanStock(stockEntryRepository);
new RestController(
  httpServer,
  calculateStock,
  increaseStock,
  decreaseStock,
  cleanStock
);

httpServer.listen(3003);
