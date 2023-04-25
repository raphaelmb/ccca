import { expect, test } from "vitest";
import FreightCalculator from "../../src/domain/entities/FreightCalculator";
import Product from "../../src/domain/entities/Product";

test("should calculate freight with standard distance", () => {
  const product = new Product(1, "A", 1000, 100, 30, 10, 3);
  const freight = FreightCalculator.calculate(product);
  expect(freight).toBe(30);
});

test("should calculate freight with standard distance", () => {
  const product = new Product(2, "B", 1000, 50, 50, 50, 22);
  const freight = FreightCalculator.calculate(product);
  expect(freight).toBe(220);
});

test("should calculate minimum freight", () => {
  const product = new Product(3, "C", 10, 10, 10, 10, 0.9);
  const freight = FreightCalculator.calculate(product);
  expect(freight).toBe(10);
});

test("should calculate freight with variable distance", () => {
  const product = new Product(1, "A", 1000, 100, 30, 10, 3);
  const distance = 748.2217780081631;
  const freight = FreightCalculator.calculate(product, distance);
  expect(freight).toBe(22.45);
});
