import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { orderMenuService } from './service';
import orderSlice from './slice';

export const store = configureStore({
  reducer: {
    [orderMenuService.reducerPath]: orderMenuService.reducer,
    order: orderSlice.reducer,
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
