import { Field, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { GraphQLJSONObject } from 'graphql-type-json'

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
  description: 'Sort direction type definition',
})

@InputType()
export class PaginationParams {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  page?: number

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  pageSize?: number

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  sort?: string[]

  @Field(() => SortDirection, { nullable: true })
  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection?: SortDirection

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  search?: string
}

@ObjectType()
export class QueryParams {
  @Field(() => Int)
  skip: number

  @Field(() => Int)
  limit: number

  @Field(() => GraphQLJSONObject, { nullable: true })
  sort?: object
}
