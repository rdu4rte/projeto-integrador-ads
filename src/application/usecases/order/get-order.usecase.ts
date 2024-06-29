import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

import { DefaultResponse, Order } from '@/application/dtos'
import { OrderRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace GetOrderUseCase {
  type Input = {
    input: string
    dbConn: Db
  }

  type Output = Order | DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly orderRepository: OrderRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<Order | DefaultResponse> {
      const isObjectIdValid = ObjectId.isValid(input)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      this.logger.log(GetOrderUseCase.UseCase.name, `Getting order by id "${input}"`)

      const order = await this.orderRepository.getOne(
        { _id: new ObjectId(input) },
        dbConn
      )

      if (!order)
        return {
          details: `Order not found by id "${input}"`,
          success: false,
        }

      return order as Order
    }
  }
}
