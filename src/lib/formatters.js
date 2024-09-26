const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 0,
})

export function formatCurrency(amount) {
  return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

export function formatNumber(number) {
  return NUMBER_FORMATTER.format(number)
}

export const formatPrice = (amount) => {
  // Convert the amount from cents (e.g., 30998) to dollars (e.g., 309.98)
  const dollars = amount / 100;

  // Use toLocaleString for proper formatting and include dollar sign
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};