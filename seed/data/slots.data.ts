import { ObjectId } from 'mongodb'

import { Slot, SlotSegment } from '../../src/application/dtos'
import { products } from './products.data'

export const slots: Slot[] = [
  {
    _id: new ObjectId('6678bc50c4c8868bb0f86282'),
    section: 1,
    segment: SlotSegment.apparelAndPersonalCare,
    createdAt: new Date(),
    updatedAt: new Date(),
    quantity: 100,
    active: true,
    product: {
      _id: products[0]._id,
      unitValue: products[0].unitValue,
      name: products[0].name,
    },
  },
  {
    _id: new ObjectId('6678bd8e16687963e73e2142'),
    section: 2,
    segment: SlotSegment.eletronicsAndEntertainment,
    createdAt: new Date(),
    updatedAt: new Date(),
    quantity: 50,
    active: true,
    product: {
      _id: products[1]._id,
      unitValue: products[1].unitValue,
      name: products[1].name,
    },
  },
]
