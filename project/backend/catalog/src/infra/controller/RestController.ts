import GetProduct from "../../application/GetProduct";
import GetProducts from "../../application/GetProducts";
import ProductData from "../../domain/data/ProductData";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getProduct: GetProduct,
    readonly getProducts: GetProducts
  ) {
    httpServer.on("get", "/products", async (params: any, body: any) => {
      console.log("GET /products");
      const output = await getProducts.execute();
      return output;
    });

    httpServer.on(
      "get",
      "/products/:idProduct",
      async (params: any, body: any) => {
        console.log("GET /products");
        const output = await getProduct.execute(params.idProduct);
        return output;
      }
    );
  }
}
