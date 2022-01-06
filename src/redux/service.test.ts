import { FetchMock } from 'jest-fetch-mock'
import { omit } from 'lodash'

import { orderMenuService } from './service'
import { setupApiStore } from '../test/helper/mockedStore'
import { MENU } from '../constants'

const fetchMock: FetchMock = global.fetch as FetchMock;

beforeEach(() => {
  fetchMock.dontMock()
})

describe("Test list-menu API", () => {
  const storeRef = setupApiStore(orderMenuService)
  test('shoudld have expected request', async () => {
    expect.assertions(3)

    const result = await storeRef.store.dispatch<any>(orderMenuService.endpoints.menu.initiate())
    expect(result.status).toBe('fulfilled')
    expect(result.isSuccess).toBe(true)

    const matchedItems = MENU.map(item => omit(item, ['id']))
    expect(result.data).toMatchObject(matchedItems)
  })

  test('should be able to handle unsuccessful response', async () => {
    expect.assertions(2)
    fetchMock.doMock()
    fetchMock.mockReject(new Error('404 Not Found'))

    const result = await storeRef.store.dispatch<any>(
      orderMenuService.endpoints.menu.initiate(undefined, { forceRefetch: true }))

    expect(result.isSuccess).toBe(false)
    expect(result.error).toStrictEqual({ status: 'FETCH_ERROR', error: 'Error: 404 Not Found' })
  })
})