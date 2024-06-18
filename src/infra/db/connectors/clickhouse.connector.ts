import {
  createClient,
  ClickHouseClient,
  CommandResult,
  InsertResult,
} from '@clickhouse/client'
import { BaseResultSet } from '@clickhouse/client'
import * as fs from 'fs'
import { Readable } from 'stream'

export const ClickhouseConnector = {
  client: null as unknown as ClickHouseClient<Readable>,

  /**
   * @description Create and returns clickhouse client
   * @param {string} host
   * @param {string} username
   * @param {string} password
   * @returns {ClickHouseClient<Readable>}
   */
  async connect(
    host: string,
    username: string,
    password: string
  ): Promise<ClickHouseClient<Readable>> {
    this.client = createClient({
      host,
      username,
      password,
    })

    return this.client
  },

  /**
   * @description Close clickhouse client connection
   */
  async close(): Promise<void> {
    if (this.client) await this.client.close()
  },

  /**
   * @description Drop database if exists and then create based on provided schema name
   * @param {string} schema
   * @returns {CommandResult}
   */
  async createDatabase(schema: string): Promise<CommandResult> {
    if (!this.client) await this.connect()

    return await this.client.command({
      query: `CREATE DATABASE IF NOT EXISTS ${schema}`,
    })
  },

  /**
   * @description Insert stream into provided table
   * @param {fs.ReadStream} data
   * @param {string} tableName
   * @returns {InsertResult}
   */
  async executeCsvInsert(data: fs.ReadStream, tableName: string): Promise<InsertResult> {
    if (!this.client) await this.connect()

    return await this.client.insert({
      table: tableName,
      values: data,
      format: 'CSVWithNames',
    })
  },

  /**
   * @description Execute query command
   * @param {string} query
   * @returns {BaseResultSet<Readable>}
   */
  async executeQuery(query: string): Promise<BaseResultSet<Readable>> {
    if (!this.client) await this.connect()
    return await this.client.query({ query })
  },

  /**
   * @description Execute command
   * @param {string} query
   * @returns {CommandResult}
   */
  async executeCommand(query: string): Promise<CommandResult> {
    if (!this.client) await this.connect()
    return await this.client.command({ query })
  },
}
