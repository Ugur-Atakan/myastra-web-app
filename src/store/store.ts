import { configureStore } from '@reduxjs/toolkit';
import userSlice  from './slices/userSlice';
import  marketSlice from './slices/marketSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    market: marketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;