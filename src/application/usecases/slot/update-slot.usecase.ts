import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

import { DefaultResponse, Slot, SlotUpdateParamsInput } from '@/application/dtos'
import { SlotRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace UpdateSlotUseCase {
  type Input = {
    input: SlotUpdateParamsInput
    dbConn: Db
  }

  type Output = Slot | DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly slotRepository: SlotRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<Slot | DefaultResponse> {
      const { id, update } = input

      const isObjectIdValid = ObjectId.isValid(id)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      this.logger.log(UpdateSlotUseCase.UseCase.name, `Updating slot by id "${id}"`)

      const slot = await this.slotRepository.getOne({ _id: new ObjectId(id) }, dbConn)

      if (!slot)
        return {
          details: `Slot not found by id "${id}"`,
          success: false,
        }

      const updatedSlot: Slot = Object.assign(
        {},
        update.section !== undefined ? { section: +update.section } : null,
        update.segment !== undefined ? { segment: update.segment } : null,
        update.quantity !== undefined ? { quantity: +update.quantity } : null,
        update.active !== undefined ? { active: update.active } : null,
        { updatedAt: new Date() }
      )

      if (Object.values(updatedSlot).length === 0)
        return {
          details: 'Failed to update slot, no parameters were received',
          success: false,
        }

      if (updatedSlot.section !== undefined) {
        const slotBySection = await this.slotRepository.getOne(
          { section: updatedSlot.section },
          dbConn
        )

        if (slotBySection)
          return {
            details: `A slot with the same section ("${updatedSlot.section}") already exists`,
            success: false,
          }
      }

      const updateSlotResult = await this.slotRepository.updateOne<Slot>(
        id,
        '_id',
        { $set: updatedSlot },
        dbConn
      )

      if (!updateSlotResult)
        return {
          details: 'Failed to update slot',
          success: false,
        }

      return updateSlotResult
    }
  }
}
