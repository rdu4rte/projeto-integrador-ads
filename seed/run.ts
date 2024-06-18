import { LoggerService } from '../src/main/logger'

const logger = new LoggerService()
const CONTEXT = 'Seeder'

const run = async (): Promise<void> => {
  try {
    logger.log(CONTEXT, 'seeded')
  } catch (err) {
    logger.error(CONTEXT, `failed to seed due to: ${err?.message}`)
    process.exit(1)
  }
}

run().then(() => process.exit(0))
