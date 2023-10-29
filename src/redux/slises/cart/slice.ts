import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartPizza } from '../../../utils/getCartPizza';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { TCartItem, cartSliceState } from './types';
// это одна из вариаций структуры папок и кода(наверное), типы и селекторы отдельно от слайса, но мне немного лень делать такое для остальных двух слайсов.
// Также можно уже вынести папку cart из папки slices, но мне опять лень.
const initialState: cartSliceState = getCartPizza();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      // нет action, можно не типизировать
      state.items = [];

      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
