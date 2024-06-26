import { Inject } from '@nestjs/common'
import { Args, Context, Directive, Query, Resolver } from '@nestjs/graphql'

import { HttpContext } from '@/domain/http'
import { UseCaseProxy } from '@/domain/usecases-proxy'
import { UsecasesProxyModule } from '@/main/modules/usecases-proxy.module'

import { PaginationParams, Product, ProductsDataResponse } from '../dtos'
import { GetProductsUseCase } from '../usecases/product'

@Resolver(Product)
export class ProductResolver {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASE)
    private readonly getProductsProxy: UseCaseProxy<GetProductsUseCase.UseCase>
  ) {}

  @Directive('@dbConnection')
  @Query(() => ProductsDataResponse)
  async products(
    @Args('input') input: PaginationParams,
    @Context() { dbConn }: HttpContext
  ): Promise<ProductsDataResponse> {
    return this.getProductsProxy.getInstance().perform({ input, dbConn })
  }
}
