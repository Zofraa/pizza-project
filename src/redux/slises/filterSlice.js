import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setCategoryId(state, action) {
      // в обьектах это называется метод, хотя по факту функция
      state.activeCategory = action.payload;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.activeCategory = Number(action.payload.activeCategory);
    },
  },
});

export const sortSelector = (state) => state.filter.sort;
export const filterSelector = (state) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchText } = filterSlice.actions;

export default filterSlice.reducer;
