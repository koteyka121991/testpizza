import { FilterSort } from './filterSlice';
import { RootState } from './../store';
// thunkAPI доболнительная утилитиа к createAsyncThunk
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';


type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'Loading',
  SUCCESS = 'Success',
  ERROR = 'Error',

}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
};

// состояния компонента
const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING
};

export type SearchPizzaParams = {
  currentPage: string,
  category: string,
  sortBy: string,
  order: string,
  search: string
};



// сокращеный вариант записи чтобы не передовать все параметры
// Record <string, string>;
// делаем асинхроный экшен
export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  // thunkAPI прикручивает свою логику редакса. Позволяет увидить более расширеный payload
  async (params) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get(
      `https://639098ef65ff41831118e35d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
)

// создаем сам slice тут будет логика обработки данных
const pizzasSlice = createSlice({
  // название слайса
  name: 'pizza',
  // состояние слайса
  initialState,
  // методы , экшены отвечающие за сохранение сортировки и фильтрации
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  },

  // обработка ошибок
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status='Loading';
  //     state.items= [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items= action.payload;
  //     state.status='success';
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status='error';
  //     state.items= [];
  //   },
  // }

});

export const selectPizzasData = (state: RootState) => state.pizzas
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;