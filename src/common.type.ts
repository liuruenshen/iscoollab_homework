export type Category = '日式料理' | '台菜' | '美式料理';

export interface DishItem {
  category: Category;
  dish: string;
  id: string;
}

export interface OrderItem {
  dishId: string;
  amount: number;
}

export interface ApiOrderListRequest {
  items: OrderItem[];
}

export interface OrderList extends ApiOrderListRequest {
  date: number;
  id: string;
}

export type DishHashRecord = Record<string, DishItem>;

export interface ApiMenuResponse {
  menu: DishItem[];
}

export interface ApiHistoryResponse {
  items: OrderList[];
}
