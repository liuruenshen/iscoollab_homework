import { createEntityAdapter } from '@reduxjs/toolkit';
import { OrderItem } from '../common.type';

const orderAdapter = createEntityAdapter<OrderItem>({
  selectId: (order) => order.dishId,
});

export default orderAdapter;
