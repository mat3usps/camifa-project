import currency from "currency.js";
import type { CurrencyCode } from "~/models/CurrencyCode";

export function displayCurrency(value: number, currencyCode: CurrencyCode) {
  return formatCurrency(value, currencyCode).format();
}

function formatCurrency(value: number, currencyCode: CurrencyCode) {
  return currency(value, {
    symbol: getSymbol(),
    separator: ".",
    decimal: getDecimal(),
    fromCents: true,
  });

  function getSymbol() {
    const mapper = {
      BRL: "R$ ",
      EUR: "€",
      USD: "$",
    };
    return mapper[currencyCode];
  }

  function getDecimal() {
    if (["BRL"].includes(currencyCode)) {
      return ",";
    }
    return ".";
  }
}

export function sumCurrency(values: number[]) {
  return values.reduce((acc, value) => acc + value, 0);
}

export function getCreditCardPurchaseInstallments({
  value,
  installments,
}: {
  value: number;
  installments: number;
}) {
  const [firstInstallment, splitValue] =
    splitCreditCardPurchaseIntoInstallments({
      value,
      installments,
    });

  return Array.from(Array(installments).keys()).map((index) =>
    index === 0 ? firstInstallment : splitValue
  );
}

export function splitCreditCardPurchaseIntoInstallments({
  value,
  installments,
}: {
  value: number;
  installments: number;
}) {
  if (installments === 0) {
    throw new Error("installments must be greater than 0");
  }

  if (installments === 1) {
    return [value];
  }

  const diff = value % installments;

  const installmentsMultipliedByOneHundred = installments * 100;
  const splitValue = currency(
    (value - diff) / installmentsMultipliedByOneHundred
  ).intValue;

  const firstInstallment = splitValue + diff;
  return [firstInstallment, splitValue];
}
