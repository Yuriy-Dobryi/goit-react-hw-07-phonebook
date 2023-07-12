import { configureStore } from '@reduxjs/toolkit';
import { phoneBookApi } from './phoneBookApi';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    [phoneBookApi.reducerPath]: phoneBookApi.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(phoneBookApi.middleware),
});