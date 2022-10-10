import { validate } from "../../../src/example2/before/cpf";

test("Deve validar um cpf válido", () => {
  const isValid = validate("935.411.347-80");
  expect(isValid).toBeTruthy();
});

test("Deve validar um cpf inválido com todos os números iguais", () => {
  const isValid = validate("111.111.111-11");
  expect(isValid).toBeFalsy();
});

test("Deve validar cpf inválido que seja nulo", () => {
  const isValid = validate(null);
  expect(isValid).toBeFalsy();
});
