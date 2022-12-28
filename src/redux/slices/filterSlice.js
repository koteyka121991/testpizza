import { createSlice } from "@reduxjs/toolkit";
// состояния компонента
const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage:1,
  sort: { name: 'популярности', sortProperty: 'rating' }
};
// создаем сам slice тут будет логика обработки данных
const filterSlice = createSlice({
  // название слайса
  name: 'filters',
  // состояние слайса
  initialState,
  // методы , экшены отвечающие за сохранение сортировки и фильтрации
  reducers: {
    // в объекъектах функция называеться метод
    // функция хочет изменить state. При вызове диспача получаем стэйт(state) и действие (action)
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort=action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage=action.payload;
    },
    setFilters(state, action) {
      state.currentPage=Number(action.payload.currentPage);
      state.sort=action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    }
  }

});

export const selectSort=(state)=>state.filter.sort;
export const selectFilter=(state) => state.filter
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;