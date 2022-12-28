// thunkAPI доболнительная утилитиа к createAsyncThunk
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
// делаем асинхроный экшен
export const fetchPizzas = createAsyncThunk(
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
// состояния компонента
const initialState = {
  items: [], 
  status: 'Loading'
};

// создаем сам slice тут будет логика обработки данных
const pizzasSlice = createSlice({
  // название слайса
  name: 'pizza',
  // состояние слайса
  initialState,
  // методы , экшены отвечающие за сохранение сортировки и фильтрации
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  // обработка ошибок
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status='Loading';
      state.items= [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items= action.payload;
      state.status='success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status='error';
      state.items= [];
    },
  }

});

export const selectPizzasData=(state) => state.pizzas
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;