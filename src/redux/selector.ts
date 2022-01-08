import orderAdapter from './adapter';
import { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';
import { OrderItem } from '../common.type';

const { selectAll: allOrderSelector } = orderAdapter.getSelectors<RootState>(
  (state) => state.order
);

export type OrderMap = Record<string, OrderItem>;

const orderMapSelector = createSelector([allOrderSelector], (orderList) => {
  return orderList.reduce(
    (result, current) => ({ ...result, [current.dishId]: current }),
    {} as OrderMap
  );
});

export { orderMapSelector, allOrderSelector };
