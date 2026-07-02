/** Formatea un monto en dólares, sin decimales. Ej: 25000 → "$25,000". */
export function formatearUSD(monto: number): string {
  return monto.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
