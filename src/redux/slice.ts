import { createSlice } from '@reduxjs/toolkit';

import orderAdapter from './adapter';

const orderSlice = createSlice({
  name: 'books',
  initialState: orderAdapter.getInitialState(),
  reducers: {
    orderAdded: orderAdapter.addOne,
    orderSubmitted: orderAdapter.removeAll,
  },
});

export const { orderAdded, orderSubmitted } = orderSlice.actions;

export default orderSlice;
