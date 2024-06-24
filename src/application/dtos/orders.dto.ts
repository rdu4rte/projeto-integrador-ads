import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'

import { ObjectIdScalar } from '@/main/graphql/scalars'

import { ProductSlot } from './slot.dto'

export enum OrderStatus {
  progress = 'progress',
  separation = 'separation',
  transportation = 'transportation',
  delivered = 'delivered',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Order status type definition',
})

@ObjectType()
export class Order {
  constructor(init?: Partial<Order>) {
    Object.assign(this, init)
  }

  @Field(() => ObjectIdScalar)
  _id: ObjectId

  @Field(() => [ProductSlot])
  products: ProductSlot[]

  @Field(() => Float)
  totalValue: number

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => OrderStatus)
  status: OrderStatus
}
