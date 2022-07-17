export const CURRENCY_LIST = {
  ARS: "Peso Argentino",
  BRL: "Real Brasileiro",
  CAD: "Dólar Canadense",
  CLP: "Peso Chileno",
  COP: "Peso Colombiano",
  EUR: "Euro",
  USD: "Dólar Americano",
};

export type CurrencyCode = keyof typeof CURRENCY_LIST;

export const getCurrencyName = (currencyCode: CurrencyCode) =>
  CURRENCY_LIST[currencyCode];
