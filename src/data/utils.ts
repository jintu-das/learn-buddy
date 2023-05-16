export function formatNumber(number: number) {
  const format = new Intl.NumberFormat();
  return format.format(number);
}
