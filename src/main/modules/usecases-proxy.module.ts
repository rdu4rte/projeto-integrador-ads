import { DynamicModule, Module } from '@nestjs/common'

import { QueryBuilder } from '@/application/helpers'
import {
  DeleteDistributorUseCase,
  GetDistributorsUseCase,
  GetDistributorUseCase,
  InsertDistributorUseCase,
  UpdateDistributorUseCase,
} from '@/application/usecases/distributor'
import {
  DeleteOrderUseCase,
  GetOrdersUseCase,
  GetOrderUseCase,
  InsertOrderUseCase,
  UpdateOrderUseCase,
} from '@/application/usecases/order'
import {
  DeleteProductUseCase,
  GetProductsUseCase,
  GetProductUseCase,
  InsertProductUseCase,
  UpdateProductUseCase,
} from '@/application/usecases/product'
import {
  GetSlotsUseCase,
  GetSlotUseCase,
  InsertSlotUseCase,
} from '@/application/usecases/slot'
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

  static GET_DISTRIBUTORS_USECASE = 'GetDistributorsUseCase'
  static GET_DISTRIBUTOR_USECASE = 'GetDistributorUseCase'
  static INSERT_DISTRIBUTOR_USECASE = 'InsertDistributorUseCase'
  static DELETE_DISTRIBUTOR_USECASE = 'DeleteDistributorUseCase'
  static UPDATE_DISTRIBUTOR_USECASE = 'UpdateDistributorUseCase'

  static GET_SLOTS_USECASE = 'GetSlotsUseCase'
  static GET_SLOT_USECASE = 'GetSlotUseCase'
  static INSERT_SLOT_USECASE = 'InsertSlotUseCase'
  static DELETE_SLOT_USECASE = 'DeleteSlotUseCase'
  static UPDATE_SLOT_USECASE = 'UpdateSlotUseCase'

  static GET_ORDERS_USECASE = 'GetOrdersUseCase'
  static GET_ORDER_USECASE = 'GetOrderUseCase'
  static INSERT_ORDER_USECASE = 'InsertOrderUseCase'
  static DELETE_ORDER_USECASE = 'DeleteOrderUseCase'
  static UPDATE_ORDER_USECASE = 'UpdateOrderUseCase'

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
        {
          inject: [LoggerService, QueryBuilder, DistributorRepository],
          provide: UsecasesProxyModule.GET_DISTRIBUTORS_USECASE,
          useFactory: (
            logger: LoggerService,
            queryBuilder: QueryBuilder,
            distributorRepository: DistributorRepository
          ) =>
            new UseCaseProxy(
              new GetDistributorsUseCase.UseCase(
                logger,
                queryBuilder,
                distributorRepository
              )
            ),
        },
        {
          inject: [LoggerService, DistributorRepository],
          provide: UsecasesProxyModule.GET_DISTRIBUTOR_USECASE,
          useFactory: (
            logger: LoggerService,
            distributorRepository: DistributorRepository
          ) =>
            new UseCaseProxy(
              new GetDistributorUseCase.UseCase(logger, distributorRepository)
            ),
        },
        {
          inject: [LoggerService, DistributorRepository],
          provide: UsecasesProxyModule.INSERT_DISTRIBUTOR_USECASE,
          useFactory: (
            logger: LoggerService,
            distributorRepository: DistributorRepository
          ) =>
            new UseCaseProxy(
              new InsertDistributorUseCase.UseCase(logger, distributorRepository)
            ),
        },
        {
          inject: [LoggerService, DistributorRepository],
          provide: UsecasesProxyModule.DELETE_DISTRIBUTOR_USECASE,
          useFactory: (
            logger: LoggerService,
            distributorRepository: DistributorRepository
          ) =>
            new UseCaseProxy(
              new DeleteDistributorUseCase.UseCase(logger, distributorRepository)
            ),
        },
        {
          inject: [LoggerService, DistributorRepository],
          provide: UsecasesProxyModule.UPDATE_DISTRIBUTOR_USECASE,
          useFactory: (
            logger: LoggerService,
            distributorRepository: DistributorRepository
          ) =>
            new UseCaseProxy(
              new UpdateDistributorUseCase.UseCase(logger, distributorRepository)
            ),
        },
        {
          inject: [LoggerService, QueryBuilder, SlotRepository],
          provide: UsecasesProxyModule.GET_SLOTS_USECASE,
          useFactory: (
            logger: LoggerService,
            queryBuilder: QueryBuilder,
            slotRepository: SlotRepository
          ) =>
            new UseCaseProxy(
              new GetSlotsUseCase.UseCase(logger, queryBuilder, slotRepository)
            ),
        },
        {
          inject: [LoggerService, SlotRepository],
          provide: UsecasesProxyModule.GET_SLOT_USECASE,
          useFactory: (logger: LoggerService, slotRepository: SlotRepository) =>
            new UseCaseProxy(new GetSlotUseCase.UseCase(logger, slotRepository)),
        },
        {
          inject: [LoggerService, SlotRepository],
          provide: UsecasesProxyModule.INSERT_SLOT_USECASE,
          useFactory: (logger: LoggerService, slotRepository: SlotRepository) =>
            new UseCaseProxy(new InsertSlotUseCase.UseCase(logger, slotRepository)),
        },
        {
          inject: [LoggerService, SlotRepository],
          provide: UsecasesProxyModule.DELETE_SLOT_USECASE,
          useFactory: (logger: LoggerService, slotRepository: SlotRepository) =>
            new UseCaseProxy(
              new DeleteDistributorUseCase.UseCase(logger, slotRepository)
            ),
        },
        {
          inject: [LoggerService, SlotRepository],
          provide: UsecasesProxyModule.UPDATE_SLOT_USECASE,
          useFactory: (logger: LoggerService, slotRepository: SlotRepository) =>
            new UseCaseProxy(
              new UpdateDistributorUseCase.UseCase(logger, slotRepository)
            ),
        },
        {
          inject: [LoggerService, QueryBuilder, OrderRepository],
          provide: UsecasesProxyModule.GET_ORDERS_USECASE,
          useFactory: (
            logger: LoggerService,
            queryBuilder: QueryBuilder,
            orderRepository: OrderRepository
          ) =>
            new UseCaseProxy(
              new GetOrdersUseCase.UseCase(logger, queryBuilder, orderRepository)
            ),
        },
        {
          inject: [LoggerService, OrderRepository],
          provide: UsecasesProxyModule.GET_ORDER_USECASE,
          useFactory: (logger: LoggerService, orderRepository: OrderRepository) =>
            new UseCaseProxy(new GetOrderUseCase.UseCase(logger, orderRepository)),
        },
        {
          inject: [LoggerService, OrderRepository],
          provide: UsecasesProxyModule.INSERT_ORDER_USECASE,
          useFactory: (logger: LoggerService, orderRepository: OrderRepository) =>
            new UseCaseProxy(new InsertOrderUseCase.UseCase(logger, orderRepository)),
        },
        {
          inject: [LoggerService, OrderRepository],
          provide: UsecasesProxyModule.DELETE_ORDER_USECASE,
          useFactory: (logger: LoggerService, orderRepository: OrderRepository) =>
            new UseCaseProxy(new DeleteOrderUseCase.UseCase(logger, orderRepository)),
        },
        {
          inject: [LoggerService, OrderRepository],
          provide: UsecasesProxyModule.UPDATE_ORDER_USECASE,
          useFactory: (logger: LoggerService, orderRepository: OrderRepository) =>
            new UseCaseProxy(new UpdateOrderUseCase.UseCase(logger, orderRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_PRODUCTS_USECASE,
        UsecasesProxyModule.GET_PRODUCT_USECASE,
        UsecasesProxyModule.INSERT_PRODUCT_USECASE,
        UsecasesProxyModule.DELETE_PRODUCT_USECASE,
        UsecasesProxyModule.UPDATE_PRODUCT_USECASE,
        UsecasesProxyModule.GET_DISTRIBUTORS_USECASE,
        UsecasesProxyModule.GET_DISTRIBUTOR_USECASE,
        UsecasesProxyModule.INSERT_DISTRIBUTOR_USECASE,
        UsecasesProxyModule.DELETE_DISTRIBUTOR_USECASE,
        UsecasesProxyModule.UPDATE_DISTRIBUTOR_USECASE,
        UsecasesProxyModule.GET_SLOTS_USECASE,
        UsecasesProxyModule.GET_SLOT_USECASE,
        UsecasesProxyModule.INSERT_SLOT_USECASE,
        UsecasesProxyModule.DELETE_SLOT_USECASE,
        UsecasesProxyModule.UPDATE_SLOT_USECASE,
        UsecasesProxyModule.GET_ORDERS_USECASE,
        UsecasesProxyModule.GET_ORDER_USECASE,
        UsecasesProxyModule.INSERT_ORDER_USECASE,
        UsecasesProxyModule.DELETE_ORDER_USECASE,
        UsecasesProxyModule.UPDATE_ORDER_USECASE,
      ],
    }
  }
}
