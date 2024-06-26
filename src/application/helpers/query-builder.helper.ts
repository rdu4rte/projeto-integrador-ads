import { Injectable } from '@nestjs/common'

import { PaginationParams, QueryParams, SortDirection } from '@/application/dtos'
import { IMongoDbQueryBuilder } from '@/domain/helpers'

@Injectable()
export class QueryBuilder implements IMongoDbQueryBuilder {
  /**
   * @description Format pagination params for mongodb query
   * @param pagination PaginationParams
   * @returns QueryParams
   */
  buildQueryParams(pagination: PaginationParams): QueryParams {
    const { page, pageSize, sort, sortDirection } = pagination
    const queryParams: QueryParams = {
      skip: page && pageSize ? (page - 1) * pageSize : 0,
      limit: pageSize || 10,
    }

    if (sort?.[0])
      queryParams.sort = {
        [sort[0]]: sortDirection === SortDirection.DESC ? -1 : 1,
      }

    return queryParams
  }
}
