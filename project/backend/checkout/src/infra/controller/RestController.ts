import Checkout from "../../application/Checkout";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(readonly httpServer: HttpServer, readonly checkout: Checkout) {
    httpServer.on("get", "/products", async (params: any, body: any) => {
      console.log("GET /products");
      const output = [{ idProduct: 4, description: "D", price: 1000 }];
      return output;
    });

    httpServer.on("post", "/checkout", async (params: any, body: any) => {
      console.log("POST /checkout");
      const output = await checkout.execute(body);
      return output;
    });
  }
}