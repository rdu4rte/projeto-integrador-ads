import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

import {
  DefaultResponse,
  Distributor,
  DistributorUpdateParamsInput,
} from '@/application/dtos'
import { DistributorRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace UpdateDistributorUseCase {
  type Input = {
    input: DistributorUpdateParamsInput
    dbConn: Db
  }

  type Output = Distributor | DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly distributorRepository: DistributorRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<Distributor | DefaultResponse> {
      const { id, update } = input

      const isObjectIdValid = ObjectId.isValid(id)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      this.logger.log(
        UpdateDistributorUseCase.UseCase.name,
        `Updating distributor by id "${id}"`
      )

      const Distributor = await this.distributorRepository.getOne(
        { _id: new ObjectId(id) },
        dbConn
      )

      if (!Distributor)
        return {
          details: `Distributor not found by id "${id}"`,
          success: false,
        }

      const updatedDistributor: Distributor = Object.assign(
        {},
        update.name !== undefined ? { name: update.name } : null,
        update.segment !== undefined ? { segment: update.segment } : null,
        update.active !== undefined ? { active: update.active } : null,
        update.contact !== undefined ? { contact: update.contact } : null,
        { updatedAt: new Date() }
      )

      if (Object.values(updatedDistributor).length === 0)
        return {
          details: 'Failed to update distributor, no parameters were received',
          success: false,
        }

      if (updatedDistributor.name !== undefined) {
        const distributorByName = await this.distributorRepository.getOne(
          { name: updatedDistributor.name },
          dbConn
        )

        if (distributorByName)
          return {
            details: `A distributor with the same name ("${updatedDistributor.name}") already exists`,
            success: false,
          }
      }

      const updateDistributorResult =
        await this.distributorRepository.updateOne<Distributor>(
          id,
          '_id',
          { $set: updatedDistributor },
          dbConn
        )

      if (!updateDistributorResult)
        return {
          details: 'Failed to update distributor',
          success: false,
        }

      return updateDistributorResult
    }
  }
}
