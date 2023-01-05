import { configureStore } from '@reduxjs/toolkit';
import authReducer  from '../features/authSlice';
import cartReducer from '../features/cartSlice';

import productsReducer from '../features/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth:authReducer
  },
});
