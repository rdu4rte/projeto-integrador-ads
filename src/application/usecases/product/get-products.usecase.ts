import { Db, ObjectId } from 'mongodb'

import {
  PaginationParams,
  Product,
  ProductsDataResponse,
  QueryParams,
} from '@/application/dtos'
import { QueryBuilder } from '@/application/helpers'
import { ProductRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace GetProductsUseCase {
  type Input = {
    input: PaginationParams
    dbConn: Db
  }

  type Output = ProductsDataResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly queryBuilder: QueryBuilder,
      private readonly productRepository: ProductRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<ProductsDataResponse> {
      const { search } = input
      const query: any = {}

      const queryParams: QueryParams = this.queryBuilder.buildQueryParams(input)

      if (search) {
        if (ObjectId.isValid(search)) query._id = new ObjectId(search)
        else {
          query.$or = [
            { name: { $regex: `.*${search}`, $options: 'i' } },
            { description: { $regex: `.*${search}`, $options: 'i' } },
            { category: { $regex: `.*${search}`, $options: 'i' } },
          ]
        }
      }

      const [data, count] = await Promise.all([
        (await this.productRepository.getAll(queryParams, query, dbConn)) as Product[],
        await this.productRepository.countDocuments(query, dbConn),
      ])

      return { data, count }
    }
  }
}
