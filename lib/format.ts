// Клиентское форматирование чисел
export function formatPrice(price: number): string {
  // Используем фиксированный формат без пробелов для избежания гидратации
  return price.toLocaleString('ru-RU').replace(/\s/g, '');
}

// Для безопасного рендеринга на сервере используем эту функцию
export function formatPriceServer(price: number): string {
  return price.toString();
}