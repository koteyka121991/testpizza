import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
    title: string;
    price:number;
    type:string;
    count:  number;
    imageUrl: string;
    size: number
} ;

// interface типизирует только объект
interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
};

// состояния компонента
const initialState: CartSliceState = {
  totalPrice: 0,
    items: []
};
// создаем сам slice тут будет логика обработки данных
const cartSlice = createSlice({
  // название слайса
  name: 'cart',
  // состояние слайса
  initialState,
  // методы , экшены отвечающие за сохранение сортировки и фильтрации
  reducers: {
    // в объекъектах функция называеться метод
    // функция хочет изменить state. При вызове диспача получаем стэйт(state) и действие (action)
    addItem(state, action: PayloadAction<CartItem>) {
      // добовляем объект
      const findItem = state.items.find(obj => obj.id === action.payload.id);
      if (findItem) {
        // count() Выводит число, равное тому, сколько раз была вызвана конкретная функция
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: +1
        });
      }
      // вычесляем стоимость товара
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action: PayloadAction<string>) {    
     state.items= state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
  }

});
// создание селектора
export const selectCart =(state: RootState) => state.cart;
export const selectCartItemById=(id:string)=>(state: RootState) => state.cart.items.find((obj) => obj.id ===id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;

