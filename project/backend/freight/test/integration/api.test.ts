import axios from "axios";
import { test, expect } from "vitest";

test("should calculate freight", async () => {
  const input = {
    from: "22030060",
    to: "88015600",
    items: [{ volume: 0.03, density: 100, quantity: 1 }],
  };
  const response = await axios.post(
    "http://localhost:3001/calculateFreight",
    input
  );
  const output = response.data;
  expect(output.total).toBe(22.45);
});
