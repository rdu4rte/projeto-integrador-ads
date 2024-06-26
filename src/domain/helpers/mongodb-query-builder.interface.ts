import { PaginationParams, QueryParams } from '@/application/dtos'

export interface IMongoDbQueryBuilder {
  buildQueryParams: (pagination: PaginationParams) => QueryParams
}
