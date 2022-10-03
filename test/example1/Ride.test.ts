import NormalFareCalculator from "../../src/example1/NormalFareCalculator";
import OvernightFareCalculator from "../../src/example1/OvernightFareCalculator";
import OvernightSundayFareCalculator from "../../src/example1/OvernightSundayFareCalculator";
import Ride from "../../src/example1/Ride";
import SundayFareCalculator from "../../src/example1/SundayFareCalculator";

let ride: Ride;

beforeEach(() => {
  const normalFareCalculator = new NormalFareCalculator();
  const sundayFareCalculator = new SundayFareCalculator(normalFareCalculator);
  const overnightSundayFareCalculator = new OvernightSundayFareCalculator(
    sundayFareCalculator
  );
  const overnightFareCalculator = new OvernightFareCalculator(
    overnightSundayFareCalculator
  );
  ride = new Ride(overnightFareCalculator);
});

test("Deve calcular o valor da corrida em horário normal", () => {
  ride.addSegment(10, new Date("2021-03-01T10:00:00"));
  const fare = ride.finish();
  expect(fare).toBe(21);
});

test("Deve calcular o valor da corrida em horário noturno", () => {
  ride.addSegment(10, new Date("2021-03-01T23:00:00"));
  const fare = ride.finish();
  expect(fare).toBe(39);
});

test("Deve calcular o valor da corrida em horário no domingo", () => {
  ride.addSegment(10, new Date("2021-03-07T10:00:00"));
  const fare = ride.finish();
  expect(fare).toBe(29);
});

test("Deve calcular o valor da corrida em horário no domingo e noturno", () => {
  ride.addSegment(10, new Date("2021-03-07T23:00:00"));
  const fare = ride.finish();
  expect(fare).toBe(50);
});

test("Deve calcular o valor da corrida mínima", () => {
  ride.addSegment(3, new Date("2021-03-01T10:00:00"));
  const fare = ride.finish();
  expect(fare).toBe(10);
});

test("Deve retornar exception se a distância for inválida", () => {
  expect(() => ride.addSegment(-10, new Date("2021-03-01T10:00:00"))).toThrow(
    new Error("Invalid Distance")
  );
});

test("Deve retonar exception se a data for inválida", () => {
  expect(() => ride.addSegment(10, new Date("test"))).toThrow(
    new Error("Invalid Date")
  );
});

test("Deve calcular o valor da corrida em múltiplos horários", () => {
  ride.addSegment(10, new Date("2021-03-01T22:00:00"));
  ride.addSegment(10, new Date("2021-03-01T21:00:00"));
  const fare = ride.finish();
  expect(fare).toBe(60);
});
