import { Db } from 'mongodb'

import { DefaultResponse, Slot } from '@/application/dtos'
import { SlotRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace GetSlotUseCase {
  type Input = {
    input: string
    dbConn: Db
  }

  type Output = Slot | DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly slotRepository: SlotRepository
    ) {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async perform({ input, dbConn }: Input): Promise<Slot | DefaultResponse> {
      return {} as any
    }
  }
}
