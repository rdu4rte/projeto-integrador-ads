import { Inject } from '@nestjs/common'
import { Args, Context, Directive, Mutation, Query, Resolver } from '@nestjs/graphql'

import { HttpContext } from '@/domain/http'
import { UseCaseProxy } from '@/domain/usecases-proxy'
import { UsecasesProxyModule } from '@/main/modules/usecases-proxy.module'

import {
  DefaultResponse,
  PaginationParams,
  Product,
  ProductInput,
  ProductResultUnion,
  ProductsDataResponse,
  ProductUpdateParamsInput,
} from '../dtos'
import {
  DeleteProductUseCase,
  GetProductsUseCase,
  GetProductUseCase,
  InsertProductUseCase,
  UpdateProductUseCase,
} from '../usecases/product'

@Resolver(Product)
export class ProductResolver {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASE)
    private readonly getProductsProxy: UseCaseProxy<GetProductsUseCase.UseCase>,
    @Inject(UsecasesProxyModule.GET_PRODUCT_USECASE)
    private readonly getProductProxy: UseCaseProxy<GetProductUseCase.UseCase>,
    @Inject(UsecasesProxyModule.INSERT_PRODUCT_USECASE)
    private readonly insertProductProxy: UseCaseProxy<InsertProductUseCase.UseCase>,
    @Inject(UsecasesProxyModule.DELETE_PRODUCT_USECASE)
    private readonly deleteProductProxy: UseCaseProxy<DeleteProductUseCase.UseCase>,
    @Inject(UsecasesProxyModule.UPDATE_PRODUCT_USECASE)
    private readonly updateProductProxy: UseCaseProxy<UpdateProductUseCase.UseCase>
  ) {}

  @Directive('@dbConnection')
  @Query(() => ProductsDataResponse)
  async products(
    @Args('input') input: PaginationParams,
    @Context() { dbConn }: HttpContext
  ): Promise<ProductsDataResponse> {
    return this.getProductsProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Query(() => ProductResultUnion)
  async product(
    @Args('input') input: string,
    @Context() { dbConn }: HttpContext
  ): Promise<typeof ProductResultUnion> {
    return this.getProductProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Mutation(() => Product)
  async insertProduct(
    @Args('input') input: ProductInput,
    @Context() { dbConn }: HttpContext
  ): Promise<Product> {
    return this.insertProductProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Mutation(() => DefaultResponse)
  async deleteProduct(
    @Args('input') input: string,
    @Context() { dbConn }: HttpContext
  ): Promise<DefaultResponse> {
    return this.deleteProductProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Mutation(() => ProductResultUnion)
  async updatetProduct(
    @Args('input') input: ProductUpdateParamsInput,
    @Context() { dbConn }: HttpContext
  ): Promise<typeof ProductResultUnion> {
    return this.updateProductProxy.getInstance().perform({ input, dbConn })
  }
}
