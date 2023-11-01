import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TSort = {
  name: string;
  sortProperty: 'raiting' | 'name' | 'price' | '-raiting' | '-name' | '-price';
};

export type FilterSliceState = {
  searchText: string;
  activeCategory: number;
  currentPage: number;
  sort: TSort;
};

const initialState: FilterSliceState = {
  searchText: '',
  activeCategory: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'raiting',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      // в обьектах это называется метод, хотя по факту функция
      state.activeCategory = action.payload;
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.activeCategory = Number(action.payload.activeCategory);
    },
  },
});

export const sortSelector = (state: RootState) => state.filter.sort;
export const filterSelector = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchText } = filterSlice.actions;

export default filterSlice.reducer;
