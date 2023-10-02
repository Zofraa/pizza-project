import { configureStore } from '@reduxjs/toolkit';
import filter from './slises/filterSlice';
import cart from './slises/cartSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
  },
});
