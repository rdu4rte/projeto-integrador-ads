import { NestFactory } from '@nestjs/core'

import { config } from '../config'
import { LoggerService } from '../logger'
import { AppModule } from '../modules'

const logger = new LoggerService()

export default async (): Promise<void> => {
  const app = await NestFactory.create(AppModule)

  app.enableShutdownHooks()
  await app
    .listen(config.port)
    .then(() =>
      logger.log(
        'Bootstrap',
        `Microservice started at: http://127.0.0.1:${config.port}/graphql`
      )
    )
}
