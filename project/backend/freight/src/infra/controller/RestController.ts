import CalculateFreight from "../../application/CalculateFreight";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly calculateFreight: CalculateFreight
  ) {
    httpServer.on(
      "post",
      "/calculateFreight",
      async (params: any, body: any) => {
        console.log("GET /products");
        const output = await calculateFreight.execute(body);
        return output;
      }
    );
  }
}
