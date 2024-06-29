import { Inject } from '@nestjs/common'
import { Args, Context, Directive, Mutation, Query, Resolver } from '@nestjs/graphql'

import { HttpContext } from '@/domain/http'
import { UseCaseProxy } from '@/domain/usecases-proxy'
import { UsecasesProxyModule } from '@/main/modules/usecases-proxy.module'

import {
  DefaultResponse,
  Order,
  OrderInput,
  OrderResultUnion,
  OrdersDataResponse,
  OrderUpdateParamsInput,
  PaginationParams,
} from '../dtos'
import {
  DeleteOrderUseCase,
  GetOrdersUseCase,
  GetOrderUseCase,
  InsertOrderUseCase,
  UpdateOrderUseCase,
} from '../usecases/order'

@Resolver(Order)
export class OrderResolver {
  constructor(
    @Inject(UsecasesProxyModule.GET_ORDERS_USECASE)
    private readonly getOrdersProxy: UseCaseProxy<GetOrdersUseCase.UseCase>,
    @Inject(UsecasesProxyModule.GET_ORDER_USECASE)
    private readonly getOrderProxy: UseCaseProxy<GetOrderUseCase.UseCase>,
    @Inject(UsecasesProxyModule.INSERT_ORDER_USECASE)
    private readonly insertOrderProxy: UseCaseProxy<InsertOrderUseCase.UseCase>,
    @Inject(UsecasesProxyModule.DELETE_ORDER_USECASE)
    private readonly deleteOrderProxy: UseCaseProxy<DeleteOrderUseCase.UseCase>,
    @Inject(UsecasesProxyModule.UPDATE_ORDER_USECASE)
    private readonly updateOrderProxy: UseCaseProxy<UpdateOrderUseCase.UseCase>
  ) {}

  @Directive('@dbConnection')
  @Query(() => OrdersDataResponse)
  async orders(
    @Args('input') input: PaginationParams,
    @Context() { dbConn }: HttpContext
  ): Promise<OrdersDataResponse> {
    return this.getOrdersProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Query(() => OrderResultUnion)
  async order(
    @Args('input') input: string,
    @Context() { dbConn }: HttpContext
  ): Promise<typeof OrderResultUnion> {
    return this.getOrderProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Mutation(() => Order)
  async insertOrder(
    @Args('input') input: OrderInput,
    @Context() { dbConn }: HttpContext
  ): Promise<Order> {
    return this.insertOrderProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Mutation(() => DefaultResponse)
  async deleteOrder(
    @Args('input') input: string,
    @Context() { dbConn }: HttpContext
  ): Promise<DefaultResponse> {
    return this.deleteOrderProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Mutation(() => OrderResultUnion)
  async updateOrder(
    @Args('input') input: OrderUpdateParamsInput,
    @Context() { dbConn }: HttpContext
  ): Promise<typeof OrderResultUnion> {
    return this.updateOrderProxy.getInstance().perform({ input, dbConn })
  }
}
