import { Module } from '@nestjs/common'

import { TestResolver } from '@/application/resolvers'

@Module({
  providers: [TestResolver],
})
export class ResolversModule {}
