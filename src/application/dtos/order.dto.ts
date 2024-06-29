import {
  createUnionType,
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { IsEnum, IsNumber, IsString } from 'class-validator'
import { ObjectId } from 'mongodb'

import { ObjectIdScalar } from '@/main/graphql/scalars'

import { DefaultResponse } from './default.dto'
import { ProductCategory } from './product.dto'

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
export class OrderProductSlot {
  @Field(() => String)
  name: string

  @Field(() => Int)
  quantity: number

  @Field(() => ProductCategory)
  category: ProductCategory
}

@ObjectType()
export class Order {
  constructor(init?: Partial<Order>) {
    Object.assign(this, init)
  }

  @Field(() => ObjectIdScalar)
  _id: ObjectId

  @Field(() => [OrderProductSlot])
  products: OrderProductSlot[]

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => OrderStatus)
  status: OrderStatus
}

@ObjectType()
export class OrdersDataResponse {
  @Field(() => [Order])
  data: Order[]

  @Field(() => Int)
  count: number
}

@InputType()
export class OrderProductSlotInput {
  @Field(() => ProductCategory)
  @IsEnum(ProductCategory)
  category: ProductCategory

  @Field(() => Int)
  @IsNumber()
  quantity: number

  @Field(() => String)
  @IsString()
  name: string
}

@InputType()
export class OrderInput {
  @Field(() => [OrderProductSlotInput])
  products: OrderProductSlotInput[]
}

export const OrderResultUnion = createUnionType({
  name: 'OrderResultUnion',
  types: () => [Order, DefaultResponse] as const,
  resolveType: (value: any) => {
    if (value._id) return Order
    if (value.details) return DefaultResponse
    return null
  },
})

@InputType()
export class OrderUpdateInput {
  @Field(() => [OrderProductSlotInput], { nullable: true })
  products?: OrderProductSlotInput[]

  @Field(() => OrderStatus, { nullable: true })
  @IsEnum(OrderStatus)
  status?: OrderStatus
}

@InputType()
export class OrderUpdateParamsInput {
  @Field(() => String)
  @IsString()
  id: string

  @Field(() => OrderUpdateInput)
  update: OrderUpdateInput
}
