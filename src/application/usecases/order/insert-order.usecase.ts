import { Db } from 'mongodb'

import { Order } from '@/application/dtos'
import { OrderRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace InsertOrderUseCase {
  type Input = {
    input: any // OrderInput
    dbConn: Db
  }

  type Output = Order

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly orderRepository: OrderRepository
    ) {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async perform({ input, dbConn }: Input): Promise<Order> {
      return {} as any
    }
  }
}
