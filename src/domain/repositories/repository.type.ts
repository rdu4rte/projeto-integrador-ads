import {
  BaseResultSet,
  ClickHouseClient,
  CommandResult,
  InsertResult,
} from '@clickhouse/client'
import { ReadStream } from 'fs'
import { Db, Document, WithId } from 'mongodb'
import { Readable } from 'stream'

export type IMongoDbRepository = {
  getOne(query: object, mongoDbConn: Db): Promise<WithId<Document>>
  getAll(queryParams: object, query: object, mongoDbConn: Db): Promise<WithId<Document>[]>
  countDocuments(query: object, mongoDbConn: Db): Promise<number>
  insertOne<T>(document: T, mongoDbConn: Db): Promise<T>
  insertMany<T>(documents: T[], mongoDbConn: Db): Promise<number>
  updateOne<T>(
    filterQuery: string,
    field: string,
    update: object,
    mongoDbConn: Db
  ): Promise<T>
  updateMany(filter: object, update: object, mongoDbConn: Db): Promise<number>
  aggregate(pipeline: Document[], mongoDbConn: Db): Promise<Document[]>
}

export type IClickhouseRepository = {
  executeCommand(
    query: string,
    client: ClickHouseClient<Readable>
  ): Promise<CommandResult>
  executeQuery(
    query: string,
    client: ClickHouseClient<Readable>
  ): Promise<BaseResultSet<Readable>>
  executeInsert<T>(values: T[], client: ClickHouseClient<Readable>): Promise<InsertResult>
  executeCsvInsert(
    data: ReadStream,
    client: ClickHouseClient<Readable>
  ): Promise<InsertResult>
}
