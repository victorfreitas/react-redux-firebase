export const formatAmount = amount => {
  const nf = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
  })

  return nf.format(amount)
}
