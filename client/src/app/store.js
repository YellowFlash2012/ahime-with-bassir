import { configureStore } from '@reduxjs/toolkit';
import authReducer  from '../features/authSlice';
import cartReducer from '../features/cartSlice';
import ordersReducer from '../features/ordersSlice';

import productsReducer from '../features/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders:ordersReducer
  },
});
