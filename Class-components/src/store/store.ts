import { configureStore } from '@reduxjs/toolkit';
import { request } from '../response/request';
import { setupListeners } from '@reduxjs/toolkit/query';
import { counterSlice } from './reduser';

export const store = configureStore({
  reducer: {
    [request.reducerPath]: request.reducer,
    counter: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(request.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
