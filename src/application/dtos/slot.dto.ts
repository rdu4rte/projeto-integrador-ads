import { Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'

import { ObjectIdScalar } from '@/main/graphql/scalars'

export enum SlotSegment {
  eletronicsAndEntertainment = 'eletronicsAndEntertainment',
  apparelAndPersonalCare = 'apparelAndPersonalCare',
  homeAndOutdoor = 'homeAndOutdoor',
  toysAndBabyProducts = 'toysAndBabyProducts',
  educationAndOffice = 'educationAndOffice',
  healthAndWellness = 'healthAndWellness',
  petSupplies = 'petSupplies',
}

registerEnumType(SlotSegment, {
  name: 'SlotSegment',
  description: 'Slot segment type definition',
})

@ObjectType()
export class ProductSlot {
  @Field(() => ObjectIdScalar)
  _id: ObjectId

  @Field(() => String)
  name: string

  @Field(() => Float)
  unitValue: number

  @Field(() => Int, { nullable: true })
  quantity?: number
}

@ObjectType()
export class Slot {
  constructor(init?: Partial<Slot>) {
    Object.assign(this, init)
  }

  @Field(() => ObjectIdScalar)
  _id: ObjectId

  @Field(() => Int)
  section: number

  @Field(() => SlotSegment)
  segment: SlotSegment

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Int)
  quantity: number

  @Field(() => Boolean)
  active: boolean

  @Field(() => ProductSlot)
  product: ProductSlot
}
