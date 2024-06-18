import { Db, Document, ObjectId, WithId } from 'mongodb'

import { IMongoDbRepository } from '@/domain/repositories'

export class MongoDbRepository implements IMongoDbRepository {
  protected readonly collection: string

  constructor(collection: string) {
    this.collection = collection
  }

  /**
   * @param {object} queryParams
   * @param {object} query
   * @param {Db} mongoDbConn
   * @returns {WithId<Document>[]}
   */
  async getAll(
    queryParams: object,
    query: object,
    mongoDbConn: Db
  ): Promise<WithId<Document>[]> {
    return await mongoDbConn
      .collection(this.collection)
      .find(query, queryParams)
      .toArray()
  }

  /**
   * @param {object} query
   * @param {Db} mongoDbConn
   * @returns {WithId<Document>}
   */
  async getOne(query: object, mongoDbConn: Db): Promise<WithId<Document>> {
    return await mongoDbConn.collection(this.collection).findOne(query)
  }

  /**
   * @param {object} query
   * @param {Db} mongoDbConn
   * @returns {number}
   */
  async countDocuments(query: object, mongoDbConn: Db): Promise<number> {
    return await mongoDbConn.collection(this.collection).countDocuments(query)
  }

  /**
   * @param {T} document
   * @param {Db} mongoDbConn
   * @returns {T}
   */
  async insertOne<T>(document: T, mongoDbConn: Db): Promise<T> {
    const { insertedId } = await mongoDbConn
      .collection(this.collection)
      .insertOne(document)
    return this.getOne({ _id: new ObjectId(insertedId) }, mongoDbConn) as T
  }

  /**
   * @param {T[]} documents
   * @param {Db} dbConn
   * @returns {number}
   */
  async insertMany<T>(documents: T[], dbConn: Db): Promise<number> {
    const { insertedCount } = await dbConn
      .collection(this.collection)
      .insertMany(documents)
    return insertedCount
  }

  /**
   * @param filterQuery
   * @param field
   * @param update
   * @param mongoDbConn
   * @returns
   */
  async updateOne<T>(
    filterQuery: string,
    field: string,
    update: object,
    mongoDbConn: Db
  ): Promise<T> {
    await mongoDbConn.collection(this.collection).updateOne(
      {
        [field]: ObjectId.isValid(filterQuery) ? new ObjectId(filterQuery) : filterQuery,
      },
      update
    )

    return this.getOne(
      {
        [field]: ObjectId.isValid(filterQuery) ? new ObjectId(filterQuery) : filterQuery,
      },
      mongoDbConn
    ) as T
  }

  /**
   * @param {object} filter
   * @param {object} update
   * @param {Db} mongoDbConn
   * @returns {number}
   */
  async updateMany(filter: object, update: object, mongoDbConn: Db): Promise<number> {
    const { modifiedCount } = await mongoDbConn
      .collection(this.collection)
      .updateMany(filter, update)
    return modifiedCount
  }

  /**
   * @param {Document[]} pipeline
   * @param {Db} mongoDbConn
   * @returns {Document[]}
   */
  async aggregate(pipeline: Document[], mongoDbConn: Db): Promise<Document[]> {
    return mongoDbConn.collection(this.collection).aggregate(pipeline).toArray()
  }
}
