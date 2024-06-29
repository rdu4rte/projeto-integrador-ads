import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

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

    async perform({ input, dbConn }: Input): Promise<Slot | DefaultResponse> {
      const isObjectIdValid = ObjectId.isValid(input)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      this.logger.log(GetSlotUseCase.UseCase.name, `Getting slot by id "${input}"`)

      const slot = await this.slotRepository.getOne({ _id: new ObjectId(input) }, dbConn)

      if (!slot)
        return {
          details: `Slot not found by id "${input}"`,
          success: false,
        }

      return slot as Slot
    }
  }
}
