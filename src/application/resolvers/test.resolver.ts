import { Directive, Query, Resolver } from '@nestjs/graphql'

import { TestResponse } from '../dtos'

@Resolver()
export class TestResolver {
  @Directive('@test')
  @Query(() => TestResponse)
  ping(): TestResponse {
    console.log('resolver.hello')
    return {
      success: true,
      details: 'pong',
    }
  }
}
