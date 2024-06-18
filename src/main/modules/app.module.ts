import { Module } from '@nestjs/common'

import { GraphQLModule } from './graphql.module'
import { ResolversModule } from './resolvers.module'
import { UsecasesProxyModule } from './usecases-proxy.module'

@Module({
  imports: [UsecasesProxyModule.register(), GraphQLModule, ResolversModule],
})
export class AppModule {}
