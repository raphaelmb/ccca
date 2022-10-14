import Http from "./Http";
import express from "express";

export default class ExpressAdapter implements Http {
  app: any;

  constructor() {
    this.app = express();
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (request: any, response: any) {
      const output = await callback(request.params, request.body);
      response.json(output);
    });
  }
  listen(port: number): void {
    this.app.listen(port);
  }
}
