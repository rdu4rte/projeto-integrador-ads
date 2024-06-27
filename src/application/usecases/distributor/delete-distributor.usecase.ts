import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

import { DefaultResponse } from '@/application/dtos'
import { DistributorRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace DeleteDistributorUseCase {
  type Input = {
    input: string
    dbConn: Db
  }

  type Output = DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly distributorRepository: DistributorRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<DefaultResponse> {
      const isObjectIdValid = ObjectId.isValid(input)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      const distributor = await this.distributorRepository.getOne(
        { _id: new ObjectId(input) },
        dbConn
      )

      if (!distributor)
        return {
          details: `Distributor not found by id "${input}"`,
          success: false,
        }

      this.logger.log(
        DeleteDistributorUseCase.UseCase.name,
        `Deleting distributor by id "${input}"`
      )

      const deleteDistributorResult = await this.distributorRepository.deleteOne(
        input,
        dbConn
      )

      if (deleteDistributorResult !== 1)
        return {
          details: `Failed to delete distributor by id "${input}"`,
          success: false,
        }

      return {
        details: `Distributor deleted by id "${input}"`,
        success: true,
      }
    }
  }
}
