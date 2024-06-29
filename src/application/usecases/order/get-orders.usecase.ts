import { Db, ObjectId } from 'mongodb'

import {
  Order,
  OrdersDataResponse,
  PaginationParams,
  QueryParams,
} from '@/application/dtos'
import { QueryBuilder } from '@/application/helpers'
import { OrderRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace GetOrdersUseCase {
  type Input = {
    input: PaginationParams
    dbConn: Db
  }

  type Output = OrdersDataResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly queryBuilder: QueryBuilder,
      private readonly orderRepository: OrderRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<OrdersDataResponse> {
      const { search } = input
      const query: any = {}

      const queryParams: QueryParams = this.queryBuilder.buildQueryParams(input)

      if (search) {
        if (ObjectId.isValid(search)) query._id = new ObjectId(search)
        else {
          query.$or = [{ status: { $regex: `.*${search}`, $options: 'i' } }]
        }
      }

      this.logger.log(GetOrdersUseCase.UseCase.name, 'Getting orders')

      const [data, count] = await Promise.all([
        (await this.orderRepository.getAll(queryParams, query, dbConn)) as Order[],
        await this.orderRepository.countDocuments(query, dbConn),
      ])

      return { data, count }
    }
  }
}
