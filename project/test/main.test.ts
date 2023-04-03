import axios from "axios";
import { test, expect } from "vitest";

axios.defaults.validateStatus = () => true;

test("cannot place order with invalid cpf", async () => {
  const input = {
    cpf: "987.654.321-01",
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Invalid cpf");
});

test("should place an order with 3 items", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(6090);
});

test("should not place an order with non existing item", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [{ idProduct: 4, quantity: 1 }],
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Product not found");
});

test("should place an order with 3 items with discount coupon", async () => {
  const input = {
    cpf: "987.654.321-00",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
    coupon: "VALE20",
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(4872);
});
