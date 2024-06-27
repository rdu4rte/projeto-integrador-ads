import { Db } from 'mongodb'

import { DefaultResponse, Order } from '@/application/dtos'
import { OrderRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace UpdateOrderUseCase {
  type Input = {
    input: any // OrderUpdateParamsInput
    dbConn: Db
  }

  type Output = Order | DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly orderRepository: OrderRepository
    ) {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async perform({ input, dbConn }: Input): Promise<Order | DefaultResponse> {
      return {} as any
    }
  }
}
