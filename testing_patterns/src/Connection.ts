import pgp from "pg-promise";

export default class Connection {
  pgp: any;

  constructor() {
    this.pgp = pgp()("postgres://postgres:123456@localhost:5432/app");
  }

  query(statment: string, parameters: any) {
    return this.pgp.query(statment, parameters);
  }
}
