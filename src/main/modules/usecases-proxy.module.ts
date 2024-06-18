import { DynamicModule, Module } from '@nestjs/common'

import { LoggerService } from '../logger'

@Module({
  imports: [],
  providers: [LoggerService],
})
export class UsecasesProxyModule {
  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [],
      exports: [],
    }
  }
}
