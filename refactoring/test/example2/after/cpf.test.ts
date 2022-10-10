import { validateCpf } from "../../../src/example2/after/cpf";

test("Deve validar um cpf válido", () => {
  const isValid = validateCpf("935.411.347-80");
  expect(isValid).toBeTruthy();
});

const wrongSameDigitCpf = [
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
];

test.each(wrongSameDigitCpf)(
  "Deve validar um cpf inválido com todos os números iguais",
  (cpf) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBeFalsy();
  }
);

test("Deve validar cpf inválido que seja nulo", () => {
  const isValid = validateCpf(null);
  expect(isValid).toBeFalsy();
});

test("Deve validar um cpf válido sem pontos e traços", () => {
  const isValid = validateCpf("93541134780");
  expect(isValid).toBeTruthy();
});

test("Deve validar um cpf válido alguns pontos", () => {
  const isValid = validateCpf("935.411.34780");
  expect(isValid).toBeTruthy();
});
