import {
  createUnionType,
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'
import { ObjectId } from 'mongodb'

import { ObjectIdScalar } from '@/main/graphql/scalars'

import { DefaultResponse } from './default.dto'

export enum DistributorSegment {
  wholesale = 'wholesale',
  retail = 'retail',
  onlineMarketplace = 'onlineMarketplace',
  directMarketplace = 'directMarketplace',
  dropshipping = 'dropshipping',
  specialtyStores = 'specialtyStores',
  importExport = 'importExport',
  franchise = 'franchise',
  supermarketsAndGroceryStores = 'supermarketsAndGroceryStores',
  pharmaciesAndHealthStores = 'pharmaciesAndHealthStores',
  electronicsAndApplianceStores = 'electronicsAndApplianceStores',
  hardwareAndBuildingMaterials = 'hardwareAndBuildingMaterials',
  automotivePartsAndSupplies = 'automotivePartsAndSupplies',
  fashionAndApparelStores = 'fashionAndApparelStores',
  furnitureAndHomeDecor = 'furnitureAndHomeDecor',
  sportsAndOutdoorStores = 'sportsAndOutdoorStores',
  beautyAndCosmeticsStores = 'beautyAndCosmeticsStores',
  petSuppliesStores = 'petSuppliesStores',
  booksAndMediaStoresooksAndMediaStores = 'booksAndMediaStoresooksAndMediaStores',
}

registerEnumType(DistributorSegment, {
  name: 'DistributorSegment',
  description: 'Distributor segment type definition',
})

@ObjectType()
export class DistributorContact {
  @Field(() => String, { nullable: true })
  email?: string

  @Field(() => String, { nullable: true })
  phone?: string

  @Field(() => String, { nullable: true })
  address?: string
}

@ObjectType()
export class Distributor {
  constructor(init?: Partial<Distributor>) {
    Object.assign(this, init)
  }

  @Field(() => ObjectIdScalar)
  _id: ObjectId

  @Field(() => String)
  name: string

  @Field(() => DistributorSegment)
  segment: DistributorSegment

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Boolean)
  active: boolean

  @Field(() => DistributorContact)
  contact: DistributorContact
}

@ObjectType()
export class DistributorsDataResponse {
  @Field(() => [Distributor])
  data: Distributor[]

  @Field(() => Int)
  count: number
}

@InputType()
export class DistributorContactInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  email: string

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  phone: string

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  address: string
}

@InputType()
export class DistributorInput {
  @Field(() => String)
  @IsString()
  name: string

  @Field(() => DistributorSegment)
  @IsEnum(DistributorSegment)
  segment: DistributorSegment

  @Field(() => DistributorContactInput)
  contact: DistributorContactInput
}

export const DistributorResultUnion = createUnionType({
  name: 'DistributorResultUnion',
  types: () => [Distributor, DefaultResponse] as const,
  resolveType: (value: any) => {
    if (value._id) return Distributor
    if (value.details) return DefaultResponse
    return null
  },
})

@InputType()
export class DistributorUpdateInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string

  @Field(() => DistributorSegment, { nullable: true })
  @IsEnum(DistributorSegment)
  @IsOptional()
  segment?: DistributorSegment

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean

  @Field(() => DistributorContactInput, { nullable: true })
  @IsOptional()
  contact?: DistributorContactInput
}

@InputType()
export class DistributorUpdateParamsInput {
  @Field(() => String)
  @IsString()
  id: string

  @Field(() => DistributorUpdateInput)
  update: DistributorUpdateInput
}
