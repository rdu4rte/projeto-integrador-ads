import { ObjectId } from 'mongodb'

import { Order, OrderStatus } from '../../src/application/dtos/orders.dto'
import { products } from './products.data'

export const orders: Order[] = [
  {
    _id: new ObjectId('66793e9144d08234ed1caa94'),
    products: [
      {
        _id: products[0]._id,
        unitValue: products[0].unitValue,
        name: products[0].name,
        quantity: 10,
      },
      {
        _id: products[1]._id,
        unitValue: products[1].unitValue,
        name: products[1].name,
        quantity: 20,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    totalValue: +(10 * products[0].unitValue + 20 * products[1].unitValue).toFixed(2),
    status: OrderStatus.progress,
  },
  {
    _id: new ObjectId('6679400321e1918d9d150428'),
    products: [
      {
        _id: products[0]._id,
        unitValue: products[0].unitValue,
        name: products[0].name,
        quantity: 5,
      },
      {
        _id: products[1]._id,
        unitValue: products[1].unitValue,
        name: products[1].name,
        quantity: 2,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    totalValue: +(5 * products[0].unitValue + 2 * products[1].unitValue).toFixed(2),
    status: OrderStatus.progress,
  },
]
