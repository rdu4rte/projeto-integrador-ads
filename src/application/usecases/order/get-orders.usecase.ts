import { Db } from 'mongodb'

import { PaginationParams } from '@/application/dtos'
import { QueryBuilder } from '@/application/helpers'
import { OrderRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace GetOrdersUseCase {
  type Input = {
    input: PaginationParams
    dbConn: Db
  }

  type Output = any // OrdersDataResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly queryBuilder: QueryBuilder,
      private readonly orderRepository: OrderRepository
    ) {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async perform({ input, dbConn }: Input): Promise<any> {
      return {} as any
    }
  }
}
