import Checkout from "../../application/Checkout";
import CLIHandler from "./CLIHandler";

export default class CLIController {
  constructor(readonly handler: CLIHandler, readonly checkOut: Checkout) {
    const input: any = {
      items: [],
    };

    handler.on("set-cpf", (params: string) => {
      input.cpf = params;
      // console.log(input);
    });

    handler.on("add-item", (params: string) => {
      const [idProduct, quantity] = params.split(" ");
      input.items.push({
        idProduct: parseInt(idProduct),
        quantity: parseInt(quantity),
      });
      // console.log(input);
    });

    handler.on("checkout", async (params: string) => {
      const output = await checkOut.execute(input);
      // console.log(output);
    });
  }
}
