import { createSlice } from '@reduxjs/toolkit';
import { DishItem } from '../common.type';

import orderAdapter from './adapter';

const orderSlice = createSlice({
  name: 'order',
  initialState: orderAdapter.getInitialState(),
  reducers: {
    mealAdded: orderAdapter.addOne,
    orderSubmitted: orderAdapter.removeAll,
    changeMealAmount: orderAdapter.updateOne,
    removeMeal: orderAdapter.removeOne,
    removeOrder: orderAdapter.removeAll,
  },
});

export const {
  mealAdded,
  orderSubmitted,
  changeMealAmount,
  removeMeal,
  removeOrder,
} = orderSlice.actions;

export default orderSlice;
