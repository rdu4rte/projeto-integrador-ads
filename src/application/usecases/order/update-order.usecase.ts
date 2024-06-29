import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

import { DefaultResponse, Order, OrderUpdateParamsInput } from '@/application/dtos'
import { OrderRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace UpdateOrderUseCase {
  type Input = {
    input: OrderUpdateParamsInput
    dbConn: Db
  }

  type Output = Order | DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly orderRepository: OrderRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<Order | DefaultResponse> {
      const { id, update } = input

      const isObjectIdValid = ObjectId.isValid(id)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      this.logger.log(UpdateOrderUseCase.UseCase.name, `Updating order by id "${id}"`)

      const order = await this.orderRepository.getOne({ _id: new ObjectId(id) }, dbConn)

      if (!order)
        return {
          details: `Order not found by id "${id}"`,
          success: false,
        }

      const updatedOrder = Object.assign(
        {},
        update.products !== undefined ? { products: update.products } : null,
        update.status !== undefined ? { status: update.status } : null,
        { updatedAt: new Date() }
      )

      if (Object.values(updatedOrder).length === 0)
        return {
          details: 'Failed to update order, no parameters were received',
          success: false,
        }

      const updateOrderResult = await this.orderRepository.updateOne<Order>(
        id,
        '_id',
        { $set: updatedOrder },
        dbConn
      )

      if (!updateOrderResult)
        return {
          details: 'Failed to update order',
          success: false,
        }

      return updateOrderResult
    }
  }
}
