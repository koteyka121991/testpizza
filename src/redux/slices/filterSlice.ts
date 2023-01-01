import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SortPropertyEnum {
 RATING_DESC='rating', 
 RATING_ASC='-rating',
 TITLE_DESC='title',
 TITLE_ASC='-title',
 PRICE_DESC='price',
 PRICE_ASC='-price'
}

export type FilterSort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: FilterSort;
};

// состояния компонента
const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности', sortProperty:SortPropertyEnum.PRICE_DESC }
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<FilterSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);    
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.currentPage= 1;
        state.categoryId= 0;
        state.sort= {
           name: 'популярности', 
           sortProperty:SortPropertyEnum.RATING_DESC
        }
      }
    
    }
  }

});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;