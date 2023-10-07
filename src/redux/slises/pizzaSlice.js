import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasById', async (params) => {
  const { order, sorting, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://65019992736d26322f5bfd85.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sorting}&order=${order}${search}`
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
      console.log(state, 'загрузка');
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
      console.log(state, 'данные успешно получены');
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
      console.log(state, 'ошибка при запросе пицц');
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
