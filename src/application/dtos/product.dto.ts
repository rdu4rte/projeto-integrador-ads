import {
  createUnionType,
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { ObjectId } from 'mongodb'

import { ObjectIdScalar } from '@/main/graphql/scalars'

import { DefaultResponse } from './default.dto'

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

@ObjectType()
export class ProductsDataResponse {
  @Field(() => [Product])
  data: Product[]

  @Field(() => Int)
  count: number
}

@InputType()
export class ProductInput {
  @Field(() => String)
  @IsString()
  @MaxLength(100)
  name: string

  @Field(() => String)
  @IsString()
  @MaxLength(200)
  description: string

  @Field(() => ProductCategory)
  @IsEnum(ProductCategory)
  category: ProductCategory

  @Field(() => Float)
  @IsNumber()
  unitValue: number
}

export const ProductResultUnion = createUnionType({
  name: 'ProductResultUnion',
  types: () => [Product, DefaultResponse] as const,
  resolveType: (value: any) => {
    if (value._id) return Product
    if (value.details) return DefaultResponse
    return null
  },
})

@InputType()
export class ProductUpdateInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  name: string

  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  description: string

  @Field(() => ProductCategory, { nullable: true })
  @IsEnum(ProductCategory)
  @IsOptional()
  category: ProductCategory

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  unitValue: number

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  active: boolean
}

@InputType()
export class ProductUpdateParamsInput {
  @Field(() => String)
  @IsString()
  id: string

  @Field(() => ProductUpdateInput)
  update: ProductUpdateInput
}
