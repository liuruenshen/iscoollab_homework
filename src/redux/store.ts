import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { orderMenuService } from './service';

export const store = configureStore({
  reducer: {
    [orderMenuService.reducerPath]: orderMenuService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(orderMenuService.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
