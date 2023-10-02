import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
