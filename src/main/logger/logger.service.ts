import { Injectable, Logger } from '@nestjs/common'

import { ILogger } from '@/domain/logger'

@Injectable()
export class LoggerService extends Logger implements ILogger {
  debug(context: string, message: string) {
    if (process.env.NODE_ENV !== 'PROD') {
      super.debug(`[DEBUG] ${message}`, context)
    }
  }
  log(context: string, message: string) {
    super.log(`[INFO] ${message}`, context)
  }
  error(context: string, message: string, trace?: string) {
    super.error(`[ERROR] ${message}`, trace, context)
  }
  warn(context: string, message: string) {
    super.warn(`[WARN] ${message}`, context)
  }
  verbose(context: string, message: string) {
    super.verbose(`[VERBOSE] ${message}`, context)
  }
  object(context: string, message: string, object: any) {
    super.verbose(message, object, context)
  }
}
