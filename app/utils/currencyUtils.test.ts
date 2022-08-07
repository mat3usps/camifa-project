import {
  displayCurrency,
  getCreditCardPurchaseInstallments,
  splitCreditCardPurchaseIntoInstallments,
  sumCurrency,
} from "./currencyUtils";

describe("displayCurrency()", () => {
  it.each([
    [-5_69, "-R$ 5,69"],
    [-5, "-R$ 0,05"],
    [0, "R$ 0,00"],
    [35, "R$ 0,35"],
    [1_50, "R$ 1,50"],
    [10_99, "R$ 10,99"],
    [15_199_25, "R$ 15.199,25"],
    [3_030_002_89, "R$ 3.030.002,89"],
  ])("should format BRL value %i as %s", (value, expected) => {
    expect(displayCurrency(value, "BRL")).toBe(expected);
  });

  it.each([
    [-23_59, "-$23.59"],
    [-53, "-$0.53"],
    [0, "$0.00"],
    [35, "$0.35"],
    [1_50, "$1.50"],
    [10_99, "$10.99"],
    [15_199_25, "$15.199.25"],
    [3_030_002_89, "$3.030.002.89"],
  ])("should format USD value %i as %s", (value, expected) => {
    expect(displayCurrency(value, "USD")).toBe(expected);
  });
});

describe("sumCurrency()", () => {
  it.each([
    [[9, 0, 25], 34],
    [[99, 199, 2513], 28_11],
    [[1, 2, 3, 4, 5], 15],
    [[101, 202, 303, 404, 505], 15_15],
    [[99, 199, 15_199_25], 15_202_23],
    [[1_500_000_000, 2_500_000_000, 3_000_000_000], 7_000_000_000],
  ])("should sum values %s as %i", (input, expected) => {
    expect(sumCurrency(input)).toBe(expected);
  });
});

describe("splitCreditCardPurchaseIntoInstallments()", () => {
  it("should throw error with zero installments", () => {
    expect(() =>
      splitCreditCardPurchaseIntoInstallments({ value: 100, installments: 0 })
    ).toThrowError(Error);
  });

  it.each([
    [100, 1, [100]],
    [100, 2, [50, 50]],
    [100, 3, [34, 33]],
    [12_35, 3, [413, 411]],
    [12_35, 4, [311, 308]],
    [12_35, 5, [247, 247]],
    [12_35, 6, [210, 205]],
    [199_99, 9, [22_23, 22_22]],
  ])(
    "should return first installment and the split value for the rest",
    (value, installments, expected) => {
      const result = splitCreditCardPurchaseIntoInstallments({
        value,
        installments,
      });
      expect(result).toStrictEqual(expected);
    }
  );
});

describe("getCreditCardPurchaseInstallments()", () => {
  it("should throw error with zero installments", () => {
    expect(() =>
      getCreditCardPurchaseInstallments({ value: 100, installments: 0 })
    ).toThrowError(Error);
  });

  it.each([
    [100, 1, [100]],
    [100, 2, [50, 50]],
    [100, 3, [34, 33, 33]],
    [12_35, 3, [413, 411, 411]],
    [12_35, 4, [311, 308, 308, 308]],
    [12_35, 5, [247, 247, 247, 247, 247]],
    [12_35, 6, [210, 205, 205, 205, 205, 205]],
    [
      199_99,
      9,
      [22_23, 22_22, 22_22, 22_22, 22_22, 22_22, 22_22, 22_22, 22_22],
    ],
  ])("should return purchase installments", (value, installments, expected) => {
    const result = getCreditCardPurchaseInstallments({ value, installments });
    expect(result).toStrictEqual(expected);
  });
});
