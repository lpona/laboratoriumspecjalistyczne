import { configureStore } from '@reduxjs/toolkit';
import currentUser from './currentUserSlice';
import { moviesApi } from './api';

export const store = configureStore({
  reducer: {
    currentUser,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
