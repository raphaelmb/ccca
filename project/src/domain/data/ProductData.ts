import Product from "./domain/entities/Product";

export default interface ProductData {
  getProduct(idProduct: number): Promise<Product>;
}
