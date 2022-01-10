import React from 'react';
import * as reactRedux from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import * as service from '../../redux/service';
import * as store from '../../redux/store';
import History from './History';
import { MENU } from '../../constants';
import { DishItem, OrderList } from '../../common.type';

jest.mock('react-redux');
jest.mock('../../redux/service');
jest.mock('react-router-dom');

const mockedStore: store.RootState = {
  // @ts-ignore
  orderMenuService: {},
};

const HISTORY_DATA: OrderList[] = [
  {
    date: 1641696168915,
    id: 'bd3ae1f6-b564-4fc0-88b7-02e98755c7e3',
    items: [
      { dishId: '3', amount: 4 },
      { dishId: '4', amount: 4 },
      { dishId: '5', amount: 4 },
    ],
  },
  {
    date: 1641696575737,
    id: '1b230f05-bc23-42d9-9e71-f848f0467af8',
    items: [
      { dishId: '4', amount: 10 },
      { dishId: '5', amount: 2 },
      { dishId: '3', amount: 8 },
    ],
  },
  {
    date: 1641696581515,
    id: '9a1fb181-ef16-43f3-88a8-cace0b1323e6',
    items: [
      { dishId: '7', amount: 1 },
      { dishId: '6', amount: 1 },
      { dishId: '8', amount: 1 },
    ],
  },
];

const mockedUseDispatch = reactRedux.useDispatch as jest.Mock<
  typeof reactRedux.useDispatch
>;

const mockedUseSelector = reactRedux.useSelector as jest.Mock<
  typeof reactRedux.useSelector
>;

const mockedUseMenuQuery = service.useMenuQuery as jest.Mock<
  typeof service.useMenuQuery
>;

const mockedUseHistoryQuery = service.useHistoryQuery as jest.Mock<
  typeof service.useHistoryQuery
>;

const mockedUseCleanHistoryMutation =
  // @ts-ignore
  service.useCleanHistoryMutation as jest.Mock<
    typeof service.useCleanHistoryMutation
  >;

describe('testing the History component', () => {
  const dispatchSpy = jest.fn((arg) => arg);
  const refetchSpy = jest.fn();
  const cleanHistorySpy = jest.fn(() => {
    return;
  });
  // @ts-ignore
  mockedUseDispatch.mockImplementation(() => {
    return dispatchSpy;
  });

  mockedUseSelector.mockImplementation((selectorFn) => {
    return selectorFn(mockedStore);
  });

  // @ts-ignore
  mockedUseMenuQuery.mockImplementation(() => ({
    data: MENU,
  }));

  // @ts-ignore
  mockedUseHistoryQuery.mockImplementation(() => ({
    data: HISTORY_DATA,
    refetch: refetchSpy,
  }));

  // @ts-ignore
  mockedUseCleanHistoryMutation.mockImplementation(() => {
    return [cleanHistorySpy];
  });

  it('should render all the order items', () => {
    expect.assertions(
      HISTORY_DATA.length +
        HISTORY_DATA.reduce((result, item) => result + item.items.length * 2, 0)
    );
    render(<History />);

    const menuMap = MENU.reduce(
      (result, current) => ({ ...result, [current.id]: current }),
      {} as Record<string, DishItem>
    );

    Object.entries(HISTORY_DATA).forEach(async ([, item]) => {
      if (!item) {
        return;
      }

      const container = screen.getByTestId(`HistoryBox-${item.id}`);
      const date = screen.getByTestId(`Date-${item.id}`);

      item.items.forEach((subItem) => {
        const orderedDish = screen.getByTestId(
          `Dish-Info-${item.id}-${subItem.dishId}`
        );
        const element = orderedDish.querySelector('span');
        expect(container).toContainElement(orderedDish);
        expect(element).toHaveTextContent(
          `${menuMap[subItem.dishId].dish} x ${subItem.amount}`
        );
      });

      expect(container).toContainElement(date);
    });
  });

  it('should dispatch the expected action', async () => {
    expect.assertions(1);
    render(<History />);

    const historyElement = screen.getByTestId('Clean-History');
    userEvent.click(historyElement);
    expect(cleanHistorySpy).toBeCalledTimes(1);
  });
});
