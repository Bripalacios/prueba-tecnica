import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Agrega tus reducers aquí
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;