import { createSlice } from '@reduxjs/toolkit';

import orderAdapter from './adapter';

const orderSlice = createSlice({
  name: 'order',
  initialState: orderAdapter.getInitialState(),
  reducers: {
    mealAdded: orderAdapter.addOne,
    orderSubmitted: orderAdapter.removeAll,
  },
});

export const { mealAdded, orderSubmitted } = orderSlice.actions;

export default orderSlice;
