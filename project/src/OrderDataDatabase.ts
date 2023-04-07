import pgp from "pg-promise";
import OrderData from "./OrderData";

export default class OrderDataDatabase implements OrderData {
  async save(order: any): Promise<void> {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
    await connection.query(
      "insert into ccat9.order (cpf, total) values ($1, $2)",
      [order.cpf, order.total]
    );
    await connection.$pool.end();
  }
  async getByCpf(cpf: string): Promise<any> {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
    const [orderData] = await connection.query(
      "select * from ccat9.order where cpf = $1",
      [cpf]
    );
    await connection.$pool.end();
    return orderData;
  }

  async count(): Promise<number> {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
    const [options] = await connection.query(
      "select count(*)::integer as count from ccat9.order",
      []
    );
    return options.count;
  }
}
