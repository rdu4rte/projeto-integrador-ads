import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { Db } from 'mongodb'

import { Distributor, DistributorInput } from '@/application/dtos'
import { DistributorRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace InsertDistributorUseCase {
  type Input = {
    input: DistributorInput
    dbConn: Db
  }

  type Output = Distributor

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly distributorRepository: DistributorRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<Distributor> {
      const { name, segment, contact } = input

      const distributorExists = await this.distributorRepository.getOne({ name }, dbConn)

      if (distributorExists)
        throw new ConflictException('A distributor with the same name already exists')

      const newDistributor = new Distributor({
        name,
        segment,
        contact,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
      })

      const distributorInsertionResult =
        await this.distributorRepository.insertOne<Distributor>(newDistributor, dbConn)

      if (!distributorInsertionResult)
        throw new InternalServerErrorException('Failed to insert distributor')

      this.logger.log(
        InsertDistributorUseCase.UseCase.name,
        `New distributor ${name} inserted`
      )

      return distributorInsertionResult
    }
  }
}
