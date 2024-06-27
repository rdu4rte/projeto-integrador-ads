import { Db, ObjectId } from 'mongodb'

import {
  Distributor,
  DistributorsDataResponse,
  PaginationParams,
  QueryParams,
} from '@/application/dtos'
import { QueryBuilder } from '@/application/helpers'
import { DistributorRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace GetDistributorsUseCase {
  type Input = {
    input: PaginationParams
    dbConn: Db
  }

  type Output = DistributorsDataResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly queryBuilder: QueryBuilder,
      private readonly distributorRepository: DistributorRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<DistributorsDataResponse> {
      const { search } = input
      const query: any = {}

      const queryParams: QueryParams = this.queryBuilder.buildQueryParams(input)

      if (search) {
        if (ObjectId.isValid(search)) query._id = new ObjectId(search)
        else {
          query.$or = [
            { name: { $regex: `.*${search}`, $options: 'i' } },
            { segment: { $regex: `.*${search}`, $options: 'i' } },
          ]
        }
      }

      this.logger.log(GetDistributorsUseCase.UseCase.name, 'Getting distributors')

      const [data, count] = await Promise.all([
        (await this.distributorRepository.getAll(
          queryParams,
          query,
          dbConn
        )) as Distributor[],
        await this.distributorRepository.countDocuments(query, dbConn),
      ])

      return { data, count }
    }
  }
}
