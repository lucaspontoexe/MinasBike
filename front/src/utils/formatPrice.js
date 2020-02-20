export function batchFormatPrice(item) {
  return { ...item, price: formatPrice(item.price) };
}

export default function formatPrice(price) {
  return 'R$' + (price / 100).toFixed(2).replace('.', ',');
}
