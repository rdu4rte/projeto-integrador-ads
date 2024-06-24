import { ObjectId } from 'mongodb'

import { Product, ProductCategory } from '../../src/application/dtos'

export const products: Product[] = [
  {
    _id: new ObjectId('6678bcda3ad6366de847c5d3'),
    name: 'Product1',
    description: 'Product 1 description',
    category: ProductCategory.apparel,
    unitValue: 59.9,
    createdAt: new Date(),
    updatedAt: new Date(),
    active: true,
  },
  {
    _id: new ObjectId('6678bd35d50fbc6a86c509d8'),
    name: 'Product2',
    description: 'Product 2 description',
    category: ProductCategory.eletronicts,
    unitValue: 239.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    active: true,
  },
]
