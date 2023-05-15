import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import RestController from "./infra/controller/RestController";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
new RestController(httpServer);

httpServer.listen(3003);
