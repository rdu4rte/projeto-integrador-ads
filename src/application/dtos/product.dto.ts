import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'

import { ObjectIdScalar } from '@/main/graphql/scalars'

export enum ProductCategory {
  eletronicts = 'eletronicts',
  apparel = 'apparel',
  homeAndKitchen = 'homeAndKitchen',
  beautyAndPersonalCare = 'beautyAndPersonalCare',
  books = 'books',
  toysAndGames = 'toysAndGames',
  healthAndWellness = 'healthAndWellness',
  officeSupplies = 'officeSupplies',
  musicAndEntertainment = 'musicAndEntertainment',
  petSupplies = 'petSupplies',
  babyProducts = 'babyProducts',
  gardenAndOutdoor = 'gardenAndOutdoor',
  artsAndCrafts = 'artsAndCrafts',
}

registerEnumType(ProductCategory, {
  name: 'ProductsCategory',
  description: 'Products category type definition',
})

@ObjectType()
export class Product {
  constructor(init?: Partial<Product>) {
    Object.assign(this, init)
  }

  @Field(() => ObjectIdScalar)
  _id: ObjectId

  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => ProductCategory)
  category: ProductCategory

  @Field(() => Float)
  unitValue: number

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Boolean)
  active: boolean
}
