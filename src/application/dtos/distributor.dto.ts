import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'

import { ObjectIdScalar } from '@/main/graphql/scalars'

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
  @Field(() => String)
  email: string

  @Field(() => String)
  phone: string

  @Field(() => String)
  address: string
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
  createAt: Date

  @Field(() => Date)
  updateAt: Date

  @Field(() => Boolean)
  active: boolean

  @Field(() => DistributorContact)
  contact: DistributorContact
}
