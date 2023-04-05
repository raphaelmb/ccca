import pgp from "pg-promise";
import ProductData from "./ProductData";

export default class ProductDataDatabase implements ProductData {
  async getProduct(idProduct: number): Promise<any> {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
    const [product] = await connection.query(
      "select * from ccat9.product where id_product = $1",
      [idProduct]
    );
    await connection.$pool.end();
    return product;
  }
}
