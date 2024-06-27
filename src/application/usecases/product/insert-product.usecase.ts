import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { Db } from 'mongodb'

import { Product, ProductInput } from '@/application/dtos'
import { ProductRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace InsertProductUseCase {
  type Input = {
    input: ProductInput
    dbConn: Db
  }

  type Output = Product

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly productRepository: ProductRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<Product> {
      const { name, description, category, unitValue } = input

      const productExists = await this.productRepository.getOne({ name }, dbConn)

      if (productExists)
        throw new ConflictException('A product with the same name already exists')

      const newProduct = new Product({
        name,
        description,
        category,
        unitValue,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
      })

      const productInsertionResult = await this.productRepository.insertOne<Product>(
        newProduct,
        dbConn
      )

      if (!productInsertionResult)
        throw new InternalServerErrorException('Failed to insert product')

      this.logger.log(InsertProductUseCase.UseCase.name, `New product ${name} inserted`)

      return productInsertionResult
    }
  }
}
