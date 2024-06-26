import { DynamicModule, Module } from '@nestjs/common'

import { QueryBuilder } from '@/application/helpers'
import { GetProductsUseCase } from '@/application/usecases/product'
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
      ],
      exports: [UsecasesProxyModule.GET_PRODUCTS_USECASE],
    }
  }
}
