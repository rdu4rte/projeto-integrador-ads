import { Db } from 'mongodb'

import { DefaultResponse } from '@/application/dtos'
import { OrderRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace DeleteOrderUseCase {
  type Input = {
    input: string
    dbConn: Db
  }

  type Output = DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly orderRepository: OrderRepository
    ) {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async perform({ input, dbConn }: Input): Promise<DefaultResponse> {
      return {} as any
    }
  }
}
