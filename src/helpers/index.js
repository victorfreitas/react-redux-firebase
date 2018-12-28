export const formatAmount = amount => new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'USD',
}).format(amount)
