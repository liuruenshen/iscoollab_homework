import express from 'express';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  ApiMenuResponse,
  ApiOrderListRequest,
  ApiHistoryResponse,
  DishHashRecord,
  OrderList,
} from '../common.type';
import { writeFileSync, readFileSync } from 'fs';

import { TESTING_SERVICE_PORT, SERVICE_PORT, MENU } from '../constants';

const PROD_HISTORY_JSON_PATH = resolve(__dirname, '../../data', 'history.json');
const TESTING_HISTORY_JSON_PATH = resolve(
  __dirname,
  '../../data',
  'testing-history.json'
);

export const HISTORY_JSON_PATH =
  process.env.NODE_ENV === 'test'
    ? TESTING_HISTORY_JSON_PATH
    : PROD_HISTORY_JSON_PATH;

const app = express();

const DishHash: DishHashRecord = MENU.reduce(
  (accumulation, current) => ({ ...accumulation, [current.id]: current }),
  {}
);

const OrderHistories: OrderList[] =
  process.env.NODE_ENV === 'test' ? [] : restoreOrderHistories();

function saveOrderHistories() {
  writeFileSync(HISTORY_JSON_PATH, JSON.stringify(OrderHistories));
}

function restoreOrderHistories() {
  try {
    return JSON.parse(
      readFileSync(HISTORY_JSON_PATH, { encoding: 'utf-8' }) || '[]'
    );
  } catch (e) {
    return [];
  }
}

app.use(express.json());

app.get('/menu', (req, res) => {
  const response: ApiMenuResponse = { menu: MENU };
  const data = JSON.stringify(response);
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.send(data);
});

app.post('/order', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

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
    saveOrderHistories();
    res.send(JSON.stringify({ result: true }));
  } catch (e) {
    res.statusCode = 400;
    if (e instanceof Error) {
      res.statusMessage = e.message;
    }
    res.end();
  }
});

app.options('/order', (req, res) => {
  res.statusCode = 204;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  res.end();
});

app.get('/history', (req, res) => {
  const response: ApiHistoryResponse = { items: OrderHistories };

  res.header('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(response));
});

app.delete('/history', (req, res) => {
  OrderHistories.splice(0, OrderHistories.length);
  saveOrderHistories();

  res.header('Access-Control-Allow-Origin', '*');
  res.statusCode = 204;
  res.end();
});

app.options('/history', (req, res) => {
  res.statusCode = 204;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE');

  res.end();
});

const listeningPort =
  process.env.NODE_ENV === 'test' ? TESTING_SERVICE_PORT : SERVICE_PORT;

app.listen(listeningPort);
console.log(`API Server start serving on ${listeningPort}`);
