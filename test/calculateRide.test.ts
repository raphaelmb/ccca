import { calculateRide } from "../src/calculateRide";

test("Deve calcular o valor da corrida em horário normal", () => {
  const fare = calculateRide([
    { distance: 10, date: new Date("2021-03-01T10:00:00") },
  ]);
  expect(fare).toBe(21);
});

test("Deve calcular o valor da corrida em horário noturno", () => {
  const fare = calculateRide([
    { distance: 10, date: new Date("2021-03-01T23:00:00") },
  ]);
  expect(fare).toBe(39);
});

test("Deve calcular o valor da corrida em horário no domingo", () => {
  const fare = calculateRide([
    { distance: 10, date: new Date("2021-03-07T10:00:00") },
  ]);
  expect(fare).toBe(29);
});

test("Deve calcular o valor da corrida em horário no domingo e noturno", () => {
  const fare = calculateRide([
    { distance: 10, date: new Date("2021-03-07T23:00:00") },
  ]);
  expect(fare).toBe(50);
});

test("Deve calcular o valor da corrida mínima", () => {
  const fare = calculateRide([
    { distance: 3, date: new Date("2021-03-01T10:00:00") },
  ]);
  expect(fare).toBe(10);
});

test("Deve retornar exception se a distância for inválida", () => {
  expect(() =>
    calculateRide([{ distance: -10, date: new Date("2021-03-01T10:00:00") }])
  ).toThrow(new Error("Invalid Distance"));
});

test("Deve retonar exception se a data for inválida", () => {
  expect(() =>
    calculateRide([{ distance: 10, date: new Date("test") }])
  ).toThrow(new Error("Invalid Date"));
});

test("Deve calcular o valor da corrida em múltiplos horários", () => {
  const fare = calculateRide([
    { distance: 10, date: new Date("2021-03-01T21:00:00") },
    { distance: 10, date: new Date("2021-03-01T22:00:00") },
  ]);
  expect(fare).toBe(60);
});
