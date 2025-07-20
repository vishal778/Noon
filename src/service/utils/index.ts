import {CartItem} from '../../domain/models/Cart';

export const calculateOrderSummary = (cart: CartItem[]) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  return {subtotal, tax, total};
};

export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number,
): ((...args: Parameters<F>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
