export const CURRENCY_LIST = {
  BRL: "Real Brasileiro",
  EUR: "Euro",
  USD: "Dólar Americano",
};

export type CurrencyCode = keyof typeof CURRENCY_LIST;

export const getCurrencyName = (currencyCode: CurrencyCode) =>
  CURRENCY_LIST[currencyCode];
