export const formatAmount = amount => new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'USD',
}).format(amount)

export const sumTotalOwed = clients => clients.reduce((total, client) => (
  total + parseFloat(client.balance)
), 0)
