import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

import { DefaultResponse, Product } from '@/application/dtos'
import { ProductRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace GetProductUseCase {
  type Input = {
    input: string
    dbConn: Db
  }

  type Output = Product | DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly productRepository: ProductRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<Product | DefaultResponse> {
      const isObjectIdValid = ObjectId.isValid(input)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      this.logger.log(GetProductUseCase.UseCase.name, `Getting product by id "${input}"`)

      const product = await this.productRepository.getOne(
        { _id: new ObjectId(input) },
        dbConn
      )

      if (!product)
        return {
          details: `Product not found by id "${input}"`,
          success: false,
        }

      return product as Product
    }
  }
}
