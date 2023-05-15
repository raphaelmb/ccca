import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(
    readonly httpServer: HttpServer,
  ) {
    httpServer.on(
      "post",
      "/",
      async (params: any, body: any) => {
      }
    );
  }
}
