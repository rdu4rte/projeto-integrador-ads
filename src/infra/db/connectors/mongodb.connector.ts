import { MongoClient, type Db } from 'mongodb'

import { config } from '@/main/config'

export const MongoDbConnector = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  /**
   * @description Connect and return mongodb client
   * @param {string} uri
   * @returns {MongoClient}
   */
  async connect(uri: string): Promise<MongoClient> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)

    return this.client
  },

  /**
   * @description Disconnect mongodb client
   */
  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null as unknown as MongoClient
  },

  /**
   * @description Get mongodb URI
   * @param {string} host
   * @param {string} user
   * @param {string} password
   * @returns {string}
   */
  getUri(host: string, user: string, password: string): string {
    const prefix = config.isDev ? 'mongodb' : 'mongodb+srv'
    const params = config.isDev
      ? 'admin?maxIdleTimeMS=120000'
      : '?retryWrites=true&w=majority'

    return `${prefix}://${user}:${password}@${host}/${params}`
  },

  /**
   * @description Return mongodb connection
   * @param {string} host
   * @param {string} user
   * @param {string} password
   * @param {string} db
   * @returns {Db}
   */
  async getConnection(
    host: string,
    user: string,
    password: string,
    db: string
  ): Promise<Db> {
    this.uri = this.getUri(host, user, password)

    if (!this.client) await this.connect(this.uri)
    return this.client.db(db)
  },
}
