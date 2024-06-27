import { Module } from '@nestjs/common'

import { DistributorResolver, ProductResolver } from '@/application/resolvers'

import { UsecasesProxyModule } from './usecases-proxy.module'

@Module({
  imports: [UsecasesProxyModule.register()],
  providers: [ProductResolver, DistributorResolver],
})
export class ResolversModule {}
