import React from 'react';
import * as reactRedux from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import * as service from '../../redux/service';
import * as store from '../../redux/store';
import { MENU } from '../../constants';
import Menu from './Menu';

jest.mock('react-redux');
jest.mock('../../redux/service');

const mockedStore: store.RootState = {
  order: {
    ids: [MENU[0].id, MENU[2].id, MENU[4].id],
    entities: {
      [MENU[0].id]: { dishId: MENU[0].id, amount: 1 },
      [MENU[2].id]: { dishId: MENU[2].id, amount: 1 },
      [MENU[4].id]: { dishId: MENU[4].id, amount: 1 },
    },
  },
  // @ts-ignore
  orderMenuService: {},
};

const mockedUseDispatch = reactRedux.useDispatch as jest.Mock<
  typeof reactRedux.useDispatch
>;

const mockedUseSelector = reactRedux.useSelector as jest.Mock<
  typeof reactRedux.useSelector
>;

const mockedUseMenuQuery = service.useMenuQuery as jest.Mock<
  typeof service.useMenuQuery
>;

describe('testing the Menu component', () => {
  const dispatchSpy = jest.fn((arg) => arg);
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

  it('should render all the menu items', () => {
    expect.assertions(MENU.length);
    render(<Menu />);

    MENU.forEach((item) => {
      if (mockedStore.order.entities[item.id]) {
        expect(screen.getByTestId(item.id)).toHaveAttribute(
          'aria-disabled',
          'true'
        );
      } else {
        expect(screen.getByTestId(item.id)).not.toHaveAttribute(
          'aria-disabled'
        );
      }
    });
  });

  it('should dispatch selected meal', () => {
    expect.assertions(2);

    render(<Menu />);
    userEvent.click(screen.getByTestId(MENU[3].id));
    expect(dispatchSpy).toBeCalledTimes(1);
    expect(dispatchSpy.mock.calls[0][0]).toMatchObject({
      type: 'order/mealAdded',
      payload: {
        dishId: MENU[3].id,
        amount: 1,
      },
    });
  });
});
