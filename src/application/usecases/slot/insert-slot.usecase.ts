import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

import { Slot, SlotInput } from '@/application/dtos'
import { ProductRepository, SlotRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace InsertSlotUseCase {
  type Input = {
    input: SlotInput
    dbConn: Db
  }

  type Output = Slot

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly slotRepository: SlotRepository,
      private readonly productRepository: ProductRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<Slot> {
      const { section, segment, quantity, product } = input

      const slotExists = await this.slotRepository.getOne(
        { 'product._id': new ObjectId(product) },
        dbConn
      )

      if (slotExists)
        throw new ConflictException('A slot with this product already exists')

      const slotExistsBySection = await this.slotRepository.getOne(
        { section: section },
        dbConn
      )

      if (slotExistsBySection)
        throw new ConflictException('A slot with the same section already exists')

      const productById = await this.productRepository.getOne(
        { _id: new ObjectId(product) },
        dbConn
      )

      if (!productById)
        throw new NotFoundException(
          `Product not found by id "${product}" on slot creation`
        )

      const newSlot = new Slot({
        section,
        segment,
        quantity,
        product: {
          _id: new ObjectId(product),
          name: productById.name,
          unitValue: productById.unitValue,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
      })

      const slotInsertionResult = await this.slotRepository.insertOne<Slot>(
        newSlot,
        dbConn
      )

      if (!slotInsertionResult)
        throw new InternalServerErrorException('Failed to insert slot')

      this.logger.log(
        InsertSlotUseCase.UseCase.name,
        `New slot ${section} for product ${productById.name} inserted`
      )

      return slotInsertionResult
    }
  }
}
