import { v4 as uuidv4 } from 'uuid';

import { DishItem } from './common.type';

export const SERVICE_PORT = 8888;

export const TESTING_SERVICE_PORT = 8887;

export const MENU: DishItem[] = [
  { category: '日式料理', dish: '鰻魚丼', id: uuidv4() },
  { category: '日式料理', dish: '生魚片', id: uuidv4() },
  { category: '日式料理', dish: '唐揚雞定食', id: uuidv4() },
  { category: '台菜', dish: '滷肉飯', id: uuidv4() },
  { category: '台菜', dish: '鵝肉米粉', id: uuidv4() },
  { category: '台菜', dish: '炸醬涼麵', id: uuidv4() },
  { category: '美式料理', dish: '漢堡', id: uuidv4() },
  { category: '美式料理', dish: '薯條', id: uuidv4() },
  { category: '美式料理', dish: '雞塊', id: uuidv4() },
];
