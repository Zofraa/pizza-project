import { configureStore } from '@reduxjs/toolkit';
import filter from './slises/filterSlice';
import cart from './slises/cart/slice';
import pizza from './slises/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
