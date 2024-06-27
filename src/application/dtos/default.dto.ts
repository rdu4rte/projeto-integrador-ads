import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DefaultResponse {
  @Field(() => String)
  details: string

  @Field(() => Boolean)
  success: boolean
}
