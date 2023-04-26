import { expect, test } from "vitest";
import FreightCalculator from "../../src/domain/entities/FreightCalculator";

test("should calculate freight with standard distance", () => {
  const freight = FreightCalculator.calculate(0.03, 100);
  expect(freight).toBe(30);
});

test("should calculate freight with standard distance", () => {
  const freight = FreightCalculator.calculate(0.125, 176);
  expect(freight).toBe(220);
});

test("should calculate minimum freight", () => {
  const freight = FreightCalculator.calculate(0.01, 100);
  expect(freight).toBe(10);
});

test("should calculate freight with variable distance", () => {
  const distance = 748.2217780081631;
  const freight = FreightCalculator.calculate(0.03, 100, distance);
  expect(freight).toBe(22.45);
});
