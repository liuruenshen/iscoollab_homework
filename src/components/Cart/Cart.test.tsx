import React from 'react';
import * as reactRedux from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import * as service from '../../redux/service';
import * as store from '../../redux/store';
import { MENU } from '../../constants';
import Cart from './Cart';
import { DishItem } from '../../common.type';

jest.mock('react-redux');
jest.mock('../../redux/service');
jest.mock('react-router-dom');

const mockedStore: store.RootState = {
  order: {
    ids: [MENU[0].id, MENU[2].id, MENU[4].id],
    entities: {
      [MENU[0].id]: { dishId: MENU[0].id, amount: 3 },
      [MENU[2].id]: { dishId: MENU[2].id, amount: 2 },
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

// @ts-ignore
const mockedUseOrderMutation = service.useOrderMutation as jest.Mock<
  typeof service.useOrderMutation
>;

describe('testing the Cart component', () => {
  const dispatchSpy = jest.fn((arg) => arg);
  let updateUserOrderResolver: Promise<unknown> | null = null;
  const updateUserOrderSpy = jest.fn(
    (arg) => (updateUserOrderResolver = Promise.resolve(arg))
  );
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
  mockedUseOrderMutation.mockImplementation(() => {
    return [(arg: unknown) => updateUserOrderSpy(arg)];
  });

  it('should render all the order items', () => {
    expect.assertions(mockedStore.order.ids.length * 4);
    render(<Cart />);

    const menuMap = MENU.reduce(
      (result, current) => ({ ...result, [current.id]: current }),
      {} as Record<string, DishItem>
    );

    Object.entries(mockedStore.order.entities).forEach(async ([key, item]) => {
      if (!item) {
        return;
      }

      const container = screen.getByTestId(`MealOrderBox-${item.dishId}`);
      const inputContainer = screen.getByTestId(`TextField-${item.dishId}`);
      const mealName = screen.getByTestId(`MealName-${item.dishId}`);
      const input = inputContainer.querySelector('input');

      expect(container).toContainElement(inputContainer);
      expect(container).toContainElement(mealName);
      expect(mealName).toHaveTextContent(menuMap[item.dishId].dish);
      expect(input).toHaveValue(item.amount);
    });
  });

  it('should dispatch the expected action', async () => {
    render(<Cart />);

    let inputContainer = screen.getByTestId(`TextField-${MENU[0].id}`);
    let input = inputContainer.querySelector('input');

    if (!input) {
      fail(`Element TextField-${MENU[0].id} doesn't contain a input element`);
    }

    fireEvent.change(input, { target: { value: 4 } });
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.mock.calls[0][0]).toMatchObject({
      type: 'order/changeMealAmount',
      payload: { changes: { amount: 4, dishId: MENU[0].id }, id: MENU[0].id },
    });
    dispatchSpy.mockReset();

    inputContainer = screen.getByTestId(`TextField-${MENU[4].id}`);
    input = inputContainer.querySelector('input');

    if (!input) {
      fail(`Element TextField-${MENU[4].id} doesn't contain a input element`);
    }

    fireEvent.change(input, { target: { value: 0 } });
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.mock.calls[0][0]).toMatchObject({
      type: 'order/removeMeal',
      payload: MENU[4].id,
    });
    dispatchSpy.mockReset();

    const button = screen.getByTestId('Submit-Order');
    userEvent.click(button);
    expect(updateUserOrderSpy).toHaveBeenCalledTimes(1);
    expect(updateUserOrderSpy.mock.calls[0][0]).toMatchObject({
      items: Object.entries(mockedStore.order.entities).map(
        ([, value]) => value
      ),
    });

    await updateUserOrderResolver;

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.mock.calls[0][0]).toMatchObject({
      type: 'order/removeOrder',
      payload: undefined,
    });
    dispatchSpy.mockReset();
  });
});
