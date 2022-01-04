import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const app = express()

type Category = '日式料理' | '台菜' | '美式料理'

interface DishItem {
  category: Category;
  dish: string;
  id: string;
}

interface OrderItem {
  dishId: string;
  amount: number
}

interface OrderListRequest {
  items: OrderItem[]
}

interface OrderList extends OrderListRequest {
  date: number
  id: string
}

type DishHashRecord = Record<string, DishItem>

const Menu: DishItem[] = [
  { category: '日式料理', dish: '鰻魚丼', id: uuidv4() },
  { category: '日式料理', dish: '生魚片', id: uuidv4() },
  { category: '日式料理', dish: '唐揚雞定食', id: uuidv4() },
  { category: '台菜', dish: '滷肉飯', id: uuidv4() },
  { category: '台菜', dish: '鵝肉米粉', id: uuidv4() },
  { category: '台菜', dish: '炸醬涼麵', id: uuidv4() },
  { category: '美式料理', dish: '漢堡', id: uuidv4() },
  { category: '美式料理', dish: '薯條', id: uuidv4() },
  { category: '美式料理', dish: '雞塊', id: uuidv4() },
]

const DishHash: DishHashRecord = Menu.reduce((accumulation, current) => ({ ...accumulation, [current.id]: current }), {})

const OrderHistories: OrderList[] = []

app.use(express.json());

app.get('/menu', (req, res) => {
  const data = JSON.stringify(Menu)
  res.header('Content-Type', 'application/json')
  res.send(data)
})

app.post('/order', (req, res) => {
  try {
    const orderList: OrderListRequest = req.body
    const validOrderItems = orderList.items.filter(item => !!DishHash[item.dishId])

    if (!validOrderItems.length) {
      throw new Error('The order is empty')
    }

    const newOrder: OrderList = {
      date: Date.now(),
      id: uuidv4(),
      items: validOrderItems
    }

    OrderHistories.push(newOrder)

    res.statusCode = 204
  }
  catch (e) {
    res.statusCode = 400
    if (e instanceof Error) {
      res.statusMessage = e.message
    }
  }
  finally {
    res.end()
  }
})

app.get('/history', (req, res) => {
  res.send(JSON.stringify(OrderHistories))
})

app.listen(8888)