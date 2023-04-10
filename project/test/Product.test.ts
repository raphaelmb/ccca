import { expect, test } from "vitest";
import Product from "../src/domain/entities/Product";

test("should calculate the product's volume", () => {
  const product = new Product(1, "A", 1000, 100, 30, 10, 3);
  expect(product.getVolume()).toBe(0.03);
});

test("should calculate the product's density", () => {
  const product = new Product(1, "A", 1000, 100, 30, 10, 3);
  expect(product.getDensity()).toBe(100);
});
