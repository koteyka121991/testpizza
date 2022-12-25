import { createSlice } from "@reduxjs/toolkit";
// состояния компонента
const initialState = {
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
    addItem(state, action) { 
        // добовляем объект  
      state.items.push(action.payload);
    //   вычесляем стоимость товара
      state.totalPrice=state.items.reduce((sum, obj) => {
        return obj.price+sum;
      }, 0);
    },

    removeItem(state, action) {
        state.items.filter(obj=>obj.id!==action.payload)
      },
      clearItem(state) {
        state.items=[];
      }
  }

});
export const { addItem, removeItem , clearItem} = cartSlice.actions;

export default cartSlice.reducer;