import { expect, test } from "vitest";
import Coord from "../../src/domain/entities/Coord";
import DistanceCalculator from "../../src/domain/entities/DistanceCalculator";

test("should calculate between two coordinates", () => {
  const from = new Coord(-27.5945, -48.5477);
  const to = new Coord(-22.9129, -43.2003);
  const distance = DistanceCalculator.calculate(from, to);
  expect(distance).toBe(748.2217780081631);
});
