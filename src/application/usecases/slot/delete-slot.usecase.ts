import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

import { DefaultResponse } from '@/application/dtos'
import { SlotRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace DeleteSlotUseCase {
  type Input = {
    input: string
    dbConn: Db
  }

  type Output = DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly slotRepository: SlotRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<DefaultResponse> {
      const isObjectIdValid = ObjectId.isValid(input)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      const slot = await this.slotRepository.getOne({ _id: new ObjectId(input) }, dbConn)

      if (!slot)
        return {
          details: `Slot not found by id "${input}"`,
          success: false,
        }

      this.logger.log(DeleteSlotUseCase.UseCase.name, `Deleting slot by id "${input}"`)

      const deleteSlotResult = await this.slotRepository.deleteOne(input, dbConn)

      if (deleteSlotResult !== 1)
        return { details: `Failed to delete slot by id "${input}"`, success: false }

      return {
        details: `Slot deleted by id "${input}"`,
        success: true,
      }
    }
  }
}
