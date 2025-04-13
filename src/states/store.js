import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../states/slices/cartSlice';
import productReducer from '../states/slices/product';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});
