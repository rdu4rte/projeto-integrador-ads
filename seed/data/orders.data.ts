import { ObjectId } from 'mongodb'

import { Order, OrderStatus } from '../../src/application/dtos/order.dto'
import { products } from './products.data'

export const orders: Order[] = [
  {
    _id: new ObjectId('66793e9144d08234ed1caa94'),
    products: [
      {
        category: products[0].category,
        name: products[0].name,
        quantity: 10,
      },
      {
        category: products[1].category,
        name: products[1].name,
        quantity: 20,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: OrderStatus.progress,
  },
  {
    _id: new ObjectId('6679400321e1918d9d150428'),
    products: [
      {
        category: products[0].category,
        name: products[0].name,
        quantity: 5,
      },
      {
        category: products[1].category,
        name: products[1].name,
        quantity: 2,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: OrderStatus.progress,
  },
]
