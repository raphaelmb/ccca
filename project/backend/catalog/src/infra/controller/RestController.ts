import GetProduct from "../../application/GetProduct";
import GetProducts from "../../application/GetProducts";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getProduct: GetProduct,
    readonly getProducts: GetProducts
  ) {
    httpServer.on("get", "/products", async (params: any, body: any) => {
      const output = await getProducts.execute();
      return output;
    });

    httpServer.on(
      "get",
      "/products/:idProduct",
      async (params: any, body: any) => {
        const output = await getProduct.execute(params.idProduct);
        return output;
      }
    );
  }
}
