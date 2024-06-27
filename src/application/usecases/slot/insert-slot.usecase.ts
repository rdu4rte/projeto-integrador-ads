import { Db } from 'mongodb'

import { Slot } from '@/application/dtos'
import { SlotRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace InsertSlotUseCase {
  type Input = {
    input: any // SlotInput
    dbConn: Db
  }

  type Output = Slot

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly slotRepository: SlotRepository
    ) {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async perform({ input, dbConn }: Input): Promise<Slot> {
      return {} as any
    }
  }
}
