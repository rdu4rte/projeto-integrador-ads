import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

import { DefaultResponse } from '@/application/dtos'
import { ProductRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace DeleteProductUseCase {
  type Input = {
    input: string
    dbConn: Db
  }

  type Output = DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly productRepository: ProductRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<DefaultResponse> {
      const isObjectIdValid = ObjectId.isValid(input)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      const product = await this.productRepository.getOne(
        { _id: new ObjectId(input) },
        dbConn
      )

      if (!product)
        return {
          details: `Product not found by id "${input}"`,
          success: false,
        }

      this.logger.log(
        DeleteProductUseCase.UseCase.name,
        `Deleting product by id "${input}"`
      )

      const deleteProductResult = await this.productRepository.deleteOne(input, dbConn)

      if (deleteProductResult !== 1)
        return { details: `Failed to delete product by id "${input}"`, success: false }

      return {
        details: `Product deleted by id "${input}"`,
        success: true,
      }
    }
  }
}
