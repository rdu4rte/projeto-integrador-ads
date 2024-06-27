import { InternalServerErrorException } from '@nestjs/common'
import { Db, ObjectId } from 'mongodb'

import { DefaultResponse, Product, ProductUpdateParamsInput } from '@/application/dtos'
import { ProductRepository } from '@/domain/repositories'
import { DefaultUseCase } from '@/domain/usecases'
import { LoggerService } from '@/main/logger'

export namespace UpdateProductUseCase {
  type Input = {
    input: ProductUpdateParamsInput
    dbConn: Db
  }

  type Output = Product | DefaultResponse

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly logger: LoggerService,
      private readonly productRepository: ProductRepository
    ) {}

    async perform({ input, dbConn }: Input): Promise<Product | DefaultResponse> {
      const { id, update } = input

      const isObjectIdValid = ObjectId.isValid(id)

      if (!isObjectIdValid) throw new InternalServerErrorException('Invalid object-id')

      this.logger.log(UpdateProductUseCase.UseCase.name, `Updating product by id "${id}"`)

      const product = await this.productRepository.getOne(
        { _id: new ObjectId(id) },
        dbConn
      )

      if (!product)
        return {
          details: `Product not found by id "${id}"`,
          success: false,
        }

      const updatedProduct: Product = Object.assign(
        {},
        update.name !== undefined ? { name: update.name } : null,
        update.description !== undefined ? { description: update.description } : null,
        update.unitValue !== undefined ? { unitValue: update.unitValue } : null,
        update.category !== undefined ? { category: update.category } : null,
        update.active !== undefined ? { active: update.active } : null,
        { updatedAt: new Date() }
      )

      if (Object.values(updatedProduct).length === 0)
        return {
          details: 'Failed to update product, no parameters were received',
          success: false,
        }

      if (updatedProduct.name !== undefined) {
        const productByName = await this.productRepository.getOne(
          { name: updatedProduct.name },
          dbConn
        )

        if (productByName)
          return {
            details: `A product with the same name ("${updatedProduct.name}") already exists`,
            success: false,
          }
      }

      const updateProductResult = await this.productRepository.updateOne<Product>(
        id,
        '_id',
        { $set: updatedProduct },
        dbConn
      )

      if (!updateProductResult)
        return {
          details: 'Failed to update product',
          success: false,
        }

      return updateProductResult
    }
  }
}
