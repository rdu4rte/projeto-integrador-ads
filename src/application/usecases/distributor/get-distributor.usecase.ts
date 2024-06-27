import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

import { DefaultResponse, Distributor } from '@/application/dtos'
import { DistributorRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace GetDistributorUseCase {
  type Input = {
    input: string
    dbConn: Db
  }

  type Output = Distributor | DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly distributorRepository: DistributorRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<Distributor | DefaultResponse> {
      const isObjectIdValid = ObjectId.isValid(input)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      this.logger.log(
        GetDistributorUseCase.UseCase.name,
        `Getting distributor by id "${input}"`
      )

      const distributor = await this.distributorRepository.getOne(
        { _id: new ObjectId(input) },
        dbConn
      )

      if (!distributor)
        return {
          details: `Distributor not found by id "${input}"`,
          success: false,
        }

      return distributor as Distributor
    }
  }
}
