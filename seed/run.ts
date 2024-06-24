import { Db } from 'mongodb'

import { MongoDbConnector } from '../src/infra/db/connectors'
import { config } from '../src/main/config'
import { LoggerService } from '../src/main/logger'
import * as data from './data'

const logger = new LoggerService()
const CONTEXT = 'Seeder'

const run = async (): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000)
  })

  const dbConn: Db = await MongoDbConnector.getConnection(
    config.mongoDb.host,
    config.mongoDb.user,
    config.mongoDb.password,
    config.mongoDb.database
  )

  for (const [collection, documents] of Object.entries(data)) {
    logger.log(CONTEXT, `Seeding collection "${collection}"`)
    await dbConn.collection(collection).insertMany(documents)
  }

  logger.log(CONTEXT, 'Collections seeded')
}

run().then(() => process.exit(0))
