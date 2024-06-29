import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

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

    async perform({ input, dbConn }: Input): Promise<DefaultResponse> {
      const isObjectIdValid = ObjectId.isValid(input)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      const order = await this.orderRepository.getOne(
        { _id: new ObjectId(input) },
        dbConn
      )

      if (!order)
        return {
          details: `Order not found by id "${input}"`,
          success: false,
        }

      this.logger.log(DeleteOrderUseCase.UseCase.name, `Deleting order by id "${input}"`)

      const deleteOrderResult = await this.orderRepository.deleteOne(input, dbConn)

      if (deleteOrderResult !== 1)
        return { details: `Failed to delete order by id "${input}"`, success: false }

      return {
        details: `Order deleted by id "${input}"`,
        success: true,
      }
    }
  }
}
