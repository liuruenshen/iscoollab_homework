import { FetchMock } from 'jest-fetch-mock';
import { omit } from 'lodash';

import { orderMenuService } from './service';
import { setupApiStore } from '../test/helper/mockedStore';
import { MENU } from '../constants';
import { DishItem, OrderItem } from '../common.type';

const fetchMock: FetchMock = global.fetch as FetchMock;

beforeEach(() => {
  fetchMock.disableMocks();
});

function orderMenu(menu: DishItem[], number: number) {
  const result: OrderItem[] = [];
  for (let i = 0; i < number; ++i) {
    const pickedItemIndex = Math.floor(Math.random() * menu.length);
    result.push({
      dishId: menu[pickedItemIndex].id,
      amount: Math.floor(Math.random() * 3 + 1),
    });
  }

  return result;
}

describe('Test the menu API', () => {
  const storeRef = setupApiStore(orderMenuService);
  const orderList: OrderItem[][] = [];

  test('shoudld have expected request', async () => {
    expect.assertions(3);

    const result = await storeRef.store.dispatch<any>(
      orderMenuService.endpoints.menu.initiate()
    );
    expect(result.status).toBe('fulfilled');
    expect(result.isSuccess).toBe(true);

    const matchedItems = MENU.map((item) => omit(item, ['id']));
    expect(result.data).toMatchObject(matchedItems);
  });

  test('should be able to handle unsuccessful response', async () => {
    expect.assertions(2);
    fetchMock.enableMocks();
    fetchMock.mockReject(new Error('404 Not Found'));

    const result = await storeRef.store.dispatch<any>(
      orderMenuService.endpoints.menu.initiate(undefined, {
        forceRefetch: true,
      })
    );

    expect(result.isSuccess).toBe(false);
    expect(result.error).toStrictEqual({
      status: 'FETCH_ERROR',
      error: 'Error: 404 Not Found',
    });
  });

  test('should be able to submit the menu order', async () => {
    expect.assertions(1);

    const menu = orderMenuService.endpoints.menu.select()(
      storeRef.store.getState()
    ).data;

    if (!menu) {
      fail('The menu items should have been fetched by the first test case');
    }

    const order = orderMenu(menu, 4);
    orderList.push(order);

    const result = await storeRef.store.dispatch<any>(
      orderMenuService.endpoints.order.initiate({ items: order })
    );

    expect(result.data).toStrictEqual({ result: true });
  });

  test('should be able to get order history', async () => {
    expect.assertions(1);

    const result = await storeRef.store.dispatch<any>(
      orderMenuService.endpoints.history.initiate()
    );

    const matchedList = orderList.map((items) => ({ items }));

    expect(result.data).toMatchObject({ items: matchedList });
  });
});
