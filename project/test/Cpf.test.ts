import Cpf from "../src/Cpf";

test("Deve validar um cpf válido", () => {
  const cpf = new Cpf("935.411.347-80");
  expect(cpf.value).toBe("935.411.347-80");
});

test("Não deve validar um input inválido", () => {
  expect(() => new Cpf("")).toThrow(new Error("Invalid CPF"));
});

test("Não deve validar um cpf com tamanho inválido", () => {
  expect(() => new Cpf("935.411.347")).toThrow(new Error("Invalid CPF"));
});

const wrongSameDigitCpf = [
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
];

test.each(wrongSameDigitCpf)(
  "Deve validar um cpf inválido com todos os números iguais",
  (cpf) => {
    expect(() => new Cpf(cpf)).toThrow(new Error("Invalid CPF"));
  }
);
