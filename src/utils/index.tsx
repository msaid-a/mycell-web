export const ConvertCurrency = (amount: string | number = 0) => new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
    minimumFractionDigits: 0,
  }).format(Number(amount || 0));
  