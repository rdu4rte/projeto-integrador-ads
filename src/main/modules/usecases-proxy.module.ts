import { DynamicModule, Module } from '@nestjs/common'

import { QueryBuilder } from '@/application/helpers'
import {
  DeleteProductUseCase,
  GetProductsUseCase,
  GetProductUseCase,
  InsertProductUseCase,
  UpdateProductUseCase,
} from '@/application/usecases/product'
import {
  DistributorRepository,
  OrderRepository,
  ProductRepository,
  SlotRepository,
} from '@/domain/repositories'
import { UseCaseProxy } from '@/domain/usecases-proxy'

import { LoggerService } from '../logger'

@Module({
  imports: [],
  providers: [
    LoggerService,
    QueryBuilder,
    ProductRepository,
    DistributorRepository,
    SlotRepository,
    OrderRepository,
  ],
})
export class UsecasesProxyModule {
  static GET_PRODUCTS_USECASE = 'GetProductsUseCase'
  static GET_PRODUCT_USECASE = 'GetProductUseCase'
  static INSERT_PRODUCT_USECASE = 'InsertProductUseCase'
  static DELETE_PRODUCT_USECASE = 'DeleteProductUseCase'
  static UPDATE_PRODUCT_USECASE = 'UpdateProductUseCase'

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, QueryBuilder, ProductRepository],
          provide: UsecasesProxyModule.GET_PRODUCTS_USECASE,
          useFactory: (
            logger: LoggerService,
            queryBuilder: QueryBuilder,
            productsRepository: ProductRepository
          ) =>
            new UseCaseProxy(
              new GetProductsUseCase.UseCase(logger, queryBuilder, productsRepository)
            ),
        },
        {
          inject: [LoggerService, ProductRepository],
          provide: UsecasesProxyModule.GET_PRODUCT_USECASE,
          useFactory: (logger: LoggerService, productsRepository: ProductRepository) =>
            new UseCaseProxy(new GetProductUseCase.UseCase(logger, productsRepository)),
        },
        {
          inject: [LoggerService, ProductRepository],
          provide: UsecasesProxyModule.INSERT_PRODUCT_USECASE,
          useFactory: (logger: LoggerService, productsRepository: ProductRepository) =>
            new UseCaseProxy(
              new InsertProductUseCase.UseCase(logger, productsRepository)
            ),
        },
        {
          inject: [LoggerService, ProductRepository],
          provide: UsecasesProxyModule.DELETE_PRODUCT_USECASE,
          useFactory: (logger: LoggerService, productsRepository: ProductRepository) =>
            new UseCaseProxy(
              new DeleteProductUseCase.UseCase(logger, productsRepository)
            ),
        },
        {
          inject: [LoggerService, ProductRepository],
          provide: UsecasesProxyModule.UPDATE_PRODUCT_USECASE,
          useFactory: (logger: LoggerService, productsRepository: ProductRepository) =>
            new UseCaseProxy(
              new UpdateProductUseCase.UseCase(logger, productsRepository)
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_PRODUCTS_USECASE,
        UsecasesProxyModule.GET_PRODUCT_USECASE,
        UsecasesProxyModule.INSERT_PRODUCT_USECASE,
        UsecasesProxyModule.DELETE_PRODUCT_USECASE,
        UsecasesProxyModule.UPDATE_PRODUCT_USECASE,
      ],
    }
  }
}
