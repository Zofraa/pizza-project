import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type pizzaItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  size: number;
  type: number;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type pizzaSliceState = {
  items: pizzaItem[];
  status: Status;
};

const initialState: pizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

type FetchPizzasArgs = Record<string, string>; // можно не писать отдельный тип и сразу  params: Record<string, string>, также есть еще 1 метод

export type searchPizzaParams = {
  sorting: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasById', async (params: FetchPizzasArgs) => {
  const { sorting, order, category, search, currentPage } = params;
  const { data } = await axios.get<pizzaItem[]>(
    `https://65019992736d26322f5bfd85.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sorting}&order=${order}${search}`
  );
  return data as pizzaItem[];
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<pizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
