import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as Type from '../common.type'
import { SERVICE_PORT } from '../constants'

const serviceUrl = `http://localhost:${SERVICE_PORT}`

export const orderMenuService = createApi({
  reducerPath: 'orderMenuService',
  baseQuery: fetchBaseQuery({
    baseUrl: serviceUrl
  }),
  endpoints: (builder) => ({
    menu: builder.query<Type.ApiMenuResponse, void>({
      query() {
        return {
          url: 'menu'
        }
      }
    }),
    history: builder.query<Type.ApiHistoryResponse, void>({
      query() {
        return {
          url: 'history'
        }
      }
    }),
    order: builder.mutation<void, Type.ApiOrderListRequest>({
      query(body) {
        return {
          url: 'order',
          body
        }
      }
    })
  })
})