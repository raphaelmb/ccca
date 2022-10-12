import Dimension from "../src/Dimension";

test("Should create dimensions", () => {
  const dimension = new Dimension(100, 30, 10);
  const volume = dimension.getVolume();
  expect(volume).toBe(0.03);
});
