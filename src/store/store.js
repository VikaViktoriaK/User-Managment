import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { usersApi } from '../services/usersApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
});
