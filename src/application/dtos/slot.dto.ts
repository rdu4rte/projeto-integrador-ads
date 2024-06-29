import {
  createUnionType,
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { ObjectId } from 'mongodb'

import { ObjectIdScalar } from '@/main/graphql/scalars'

import { DefaultResponse } from './default.dto'

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

@ObjectType()
export class SlotsDataResponse {
  @Field(() => [Slot])
  data: Slot[]

  @Field(() => Int)
  count: number
}

@InputType()
export class SlotInput {
  @Field(() => Int)
  @IsNumber()
  section: number

  @Field(() => SlotSegment)
  @IsEnum(SlotSegment)
  segment: SlotSegment

  @Field(() => Int)
  @IsNumber()
  quantity: number

  @Field(() => ObjectIdScalar)
  product: ObjectId
}

export const SlotResultUnion = createUnionType({
  name: 'SlotResultUnion',
  types: () => [Slot, DefaultResponse] as const,
  resolveType: (value: any) => {
    if (value._id) return Slot
    if (value.details) return DefaultResponse
    return null
  },
})

@InputType()
export class SlotUpdateInput {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  section?: number

  @Field(() => SlotSegment, { nullable: true })
  @IsEnum(SlotSegment)
  @IsOptional()
  segment?: SlotSegment

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  quantity?: number

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  active: boolean
}

@InputType()
export class SlotUpdateParamsInput {
  @Field(() => String)
  @IsString()
  id: string

  @Field(() => SlotUpdateInput)
  update: SlotUpdateInput
}
