export function formatCurrency(amount: number, locale: string, currency: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculatePrice(
  basePrice: number,
  scopeMultiplier: number,
  timelineMultiplier: number,
  regionRate: number
): number {
  const subtotal = basePrice * scopeMultiplier * timelineMultiplier;
  return Math.round(subtotal * regionRate);
}
