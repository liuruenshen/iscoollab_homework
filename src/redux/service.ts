import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as Type from '../common.type';
import { TESTING_SERVICE_PORT, SERVICE_PORT } from '../constants';

const serviceListeningPort =
  NODE_ENV === 'test' ? TESTING_SERVICE_PORT : SERVICE_PORT;

export const serviceUrl = `http://localhost:${serviceListeningPort}`;

export const orderMenuService = createApi({
  reducerPath: 'orderMenuService',
  baseQuery: fetchBaseQuery({
    baseUrl: serviceUrl,
  }),
  endpoints: (builder) => ({
    menu: builder.query<Type.ApiMenuResponse['menu'], void>({
      query() {
        return {
          url: 'menu',
        };
      },
      transformResponse(data: Type.ApiMenuResponse) {
        return data.menu;
      },
    }),
    history: builder.query<Type.ApiHistoryResponse['items'], void>({
      query() {
        return {
          url: 'history',
        };
      },
      transformResponse(data: Type.ApiHistoryResponse) {
        return data.items;
      },
    }),
    order: builder.mutation<void, Type.ApiOrderListRequest>({
      query(body) {
        return {
          url: 'order',
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const { useMenuQuery, useHistoryQuery, useOrderMutation } =
  orderMenuService;
