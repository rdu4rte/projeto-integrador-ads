import { Module } from '@nestjs/common'

import { ProductResolver } from '@/application/resolvers'

import { UsecasesProxyModule } from './usecases-proxy.module'

@Module({
  imports: [UsecasesProxyModule.register()],
  providers: [ProductResolver],
})
export class ResolversModule {}
