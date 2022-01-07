import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  ApiMenuResponse,
  ApiOrderListRequest,
  ApiHistoryResponse,
  DishHashRecord,
  OrderList,
} from '../common.type';

import { SERVICE_PORT, MENU } from '../constants';

const app = express();

const DishHash: DishHashRecord = MENU.reduce(
  (accumulation, current) => ({ ...accumulation, [current.id]: current }),
  {}
);

const OrderHistories: OrderList[] = [];

app.use(express.json());

app.get('/menu', (req, res) => {
  const response: ApiMenuResponse = { menu: MENU };
  const data = JSON.stringify(response);
  res.header('Content-Type', 'application/json');
  res.send(data);
});

app.post('/order', (req, res) => {
  try {
    const orderList: ApiOrderListRequest = req.body;
    const validOrderItems = orderList.items.filter(
      (item) => !!DishHash[item.dishId]
    );

    if (!validOrderItems.length) {
      throw new Error('The order is empty');
    }

    const newOrder: OrderList = {
      date: Date.now(),
      id: uuidv4(),
      items: validOrderItems,
    };

    OrderHistories.push(newOrder);
    res.send(JSON.stringify({ result: true }));
  } catch (e) {
    res.statusCode = 400;
    if (e instanceof Error) {
      res.statusMessage = e.message;
    }
    res.end();
  }
});

app.get('/history', (req, res) => {
  const response: ApiHistoryResponse = { items: OrderHistories };
  res.send(JSON.stringify(response));
});

app.listen(SERVICE_PORT);
console.log('API Server start serving...');
