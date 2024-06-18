import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TestResponse {
  @Field(() => Boolean)
  success: boolean

  @Field(() => String)
  details: string
}
