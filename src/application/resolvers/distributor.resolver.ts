import { Inject } from '@nestjs/common'
import { Args, Context, Directive, Mutation, Query, Resolver } from '@nestjs/graphql'

import { HttpContext } from '@/domain/http'
import { UseCaseProxy } from '@/domain/usecases-proxy'
import { UsecasesProxyModule } from '@/main/modules/usecases-proxy.module'

import {
  DefaultResponse,
  Distributor,
  DistributorInput,
  DistributorResultUnion,
  DistributorsDataResponse,
  DistributorUpdateParamsInput,
  PaginationParams,
} from '../dtos'
import {
  DeleteDistributorUseCase,
  GetDistributorsUseCase,
  GetDistributorUseCase,
  InsertDistributorUseCase,
  UpdateDistributorUseCase,
} from '../usecases/distributor'

@Resolver(Distributor)
export class DistributorResolver {
  constructor(
    @Inject(UsecasesProxyModule.GET_DISTRIBUTORS_USECASE)
    private readonly getDistributorsProxy: UseCaseProxy<GetDistributorsUseCase.UseCase>,
    @Inject(UsecasesProxyModule.GET_DISTRIBUTOR_USECASE)
    private readonly getDistributorProxy: UseCaseProxy<GetDistributorUseCase.UseCase>,
    @Inject(UsecasesProxyModule.INSERT_DISTRIBUTOR_USECASE)
    private readonly insertDistributorProxy: UseCaseProxy<InsertDistributorUseCase.UseCase>,
    @Inject(UsecasesProxyModule.DELETE_DISTRIBUTOR_USECASE)
    private readonly deleteDistributorProxy: UseCaseProxy<DeleteDistributorUseCase.UseCase>,
    @Inject(UsecasesProxyModule.UPDATE_DISTRIBUTOR_USECASE)
    private readonly updateDistributorProxy: UseCaseProxy<UpdateDistributorUseCase.UseCase>
  ) {}

  @Directive('@dbConnection')
  @Query(() => DistributorsDataResponse)
  async distributors(
    @Args('input') input: PaginationParams,
    @Context() { dbConn }: HttpContext
  ): Promise<DistributorsDataResponse> {
    return this.getDistributorsProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Query(() => DistributorResultUnion)
  async distributor(
    @Args('input') input: string,
    @Context() { dbConn }: HttpContext
  ): Promise<typeof DistributorResultUnion> {
    return this.getDistributorProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Mutation(() => Distributor)
  async insertDistributor(
    @Args('input') input: DistributorInput,
    @Context() { dbConn }: HttpContext
  ): Promise<Distributor> {
    return this.insertDistributorProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Mutation(() => DefaultResponse)
  async deleteProduct(
    @Args('input') input: string,
    @Context() { dbConn }: HttpContext
  ): Promise<DefaultResponse> {
    return this.deleteDistributorProxy.getInstance().perform({ input, dbConn })
  }

  @Directive('@dbConnection')
  @Mutation(() => DistributorResultUnion)
  async updatetProduct(
    @Args('input') input: DistributorUpdateParamsInput,
    @Context() { dbConn }: HttpContext
  ): Promise<typeof DistributorResultUnion> {
    return this.updateDistributorProxy.getInstance().perform({ input, dbConn })
  }
}
