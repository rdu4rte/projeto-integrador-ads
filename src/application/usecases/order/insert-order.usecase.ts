import { InternalServerErrorException } from '@nestjs/common'
import { Db } from 'mongodb'

import { Order, OrderInput, OrderStatus } from '@/application/dtos'
import { OrderRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace InsertOrderUseCase {
  type Input = {
    input: OrderInput
    dbConn: Db
  }

  type Output = Order

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly orderRepository: OrderRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<Order> {
      const { products } = input

      const newOrder = new Order({
        products,
        status: OrderStatus.progress,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const orderInsertionResult = await this.orderRepository.insertOne<Order>(
        newOrder,
        dbConn
      )

      if (!orderInsertionResult)
        throw new InternalServerErrorException('Failed to insert order')

      this.logger.log(
        InsertOrderUseCase.UseCase.name,
        `New order inserted "${orderInsertionResult._id}", status: "${orderInsertionResult.status}"`
      )

      return orderInsertionResult
    }
  }
}
