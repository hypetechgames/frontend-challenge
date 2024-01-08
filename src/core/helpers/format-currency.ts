export const formatBRLCurrency = (value: number): string => {
  return value
    .toLocaleString('pt-BR', {
      currency: 'BRL',
      style: 'currency',
    })
    .replace('R$\xa0', '')
}

export const formatOdd = (value: number): string => {
  return value
    .toLocaleString('en-US', {
      currency: 'USD',
      style: 'currency',
    })
    .replace('$', '')
}

export const formatCurrencyToNumber = (text: string): number => {
  return Number(text.replace(/\D/g, '')) / 100
}
