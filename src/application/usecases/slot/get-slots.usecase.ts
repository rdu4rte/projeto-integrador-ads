import { Db, ObjectId } from 'mongodb'

import {
  PaginationParams,
  QueryParams,
  Slot,
  SlotsDataResponse,
} from '@/application/dtos'
import { QueryBuilder } from '@/application/helpers'
import { SlotRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace GetSlotsUseCase {
  type Input = {
    input: PaginationParams
    dbConn: Db
  }

  type Output = SlotsDataResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly queryBuilder: QueryBuilder,
      private readonly slotRepository: SlotRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<SlotsDataResponse> {
      const { search } = input
      const query: any = {}

      const queryParams: QueryParams = this.queryBuilder.buildQueryParams(input)

      if (search) {
        if (ObjectId.isValid(search)) query._id = new ObjectId(search)
        else {
          query.$or = [
            { segment: { $regex: `.*${search}`, $options: 'i' } },
            { section: { $regex: `.*${search}`, $options: 'i' } },
          ]
        }
      }

      this.logger.log(GetSlotsUseCase.UseCase.name, 'Getting slots')

      const [data, count] = await Promise.all([
        (await this.slotRepository.getAll(queryParams, query, dbConn)) as Slot[],
        await this.slotRepository.countDocuments(query, dbConn),
      ])

      return { data, count }
    }
  }
}
