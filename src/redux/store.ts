import { useDispatch } from 'react-redux';
// хранилище редакс
import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizzas from './slices/pizzasSlice'

// переменая store это редакс хранилище
export const store = configureStore({
  reducer: {
    filter, 
    cart,
    pizzas
  },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 