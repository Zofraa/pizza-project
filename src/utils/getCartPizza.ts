import { TCartItem } from '../redux/slises/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartPizza = () => {
  const data = localStorage.getItem('cartPizza');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as TCartItem[],
    totalPrice,
  };
};
