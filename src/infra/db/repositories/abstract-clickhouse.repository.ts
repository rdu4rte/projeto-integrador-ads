import { BaseResultSet, ClickHouseClient, CommandResult } from '@clickhouse/client'
import { ConnBaseResult, InsertResult } from '@clickhouse/client-common'
import { ReadStream } from 'fs'
import { Readable } from 'stream'

import { IClickhouseRepository } from '@/domain/repositories'

export class ClickhouseRepository implements IClickhouseRepository {
  protected readonly table: string

  constructor(table: string) {
    this.table = table
  }

  /**
   * @param {string} query
   * @param {ClickHouseClient<Readable>} client
   * @returns {CommandResult}
   */
  async executeCommand(
    query: string,
    client: ClickHouseClient<Readable>
  ): Promise<CommandResult> {
    return await client.command({ query })
  }

  /**
   * @param {string} query
   * @param {ClickHouseClient<Readable>} client
   * @returns {BaseResultSet<Readable>}
   */
  async executeQuery(
    query: string,
    client: ClickHouseClient<Readable>
  ): Promise<BaseResultSet<Readable>> {
    return await client.query({ query })
  }

  /**
   * @param {T[]} values
   * @param {ClickHouseClient<Readable>} client
   * @returns {InsertResult}
   */
  async executeInsert<T>(
    values: T[],
    client: ClickHouseClient<Readable>
  ): Promise<InsertResult> {
    return await client.insert({ table: this.table, values, format: 'JSONEachRow' })
  }

  /**
   * @param {ReadStream} data
   * @param {ClickHouseClient<Readable>} client
   * @returns {InsertResult}
   */
  async executeCsvInsert(
    data: ReadStream,
    client: ClickHouseClient<Readable>
  ): Promise<ConnBaseResult> {
    return await client.insert({
      table: this.table,
      values: data,
      format: 'CSVWithNames',
    })
  }
}
