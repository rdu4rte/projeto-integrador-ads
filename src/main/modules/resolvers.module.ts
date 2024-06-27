import { Module } from '@nestjs/common'

import {
  DistributorResolver,
  OrderResolver,
  ProductResolver,
  SlotResolver,
} from '@/application/resolvers'

import { UsecasesProxyModule } from './usecases-proxy.module'

@Module({
  imports: [UsecasesProxyModule.register()],
  providers: [ProductResolver, DistributorResolver, SlotResolver, OrderResolver],
})
export class ResolversModule {}
