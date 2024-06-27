import { Inject } from '@nestjs/common'
import { Args, Context, Directive, Mutation, Resolver } from '@nestjs/graphql'

import { HttpContext } from '@/domain/http'
import { UseCaseProxy } from '@/domain/usecases-proxy'
import { UsecasesProxyModule } from '@/main/modules/usecases-proxy.module'

import { DefaultResponse, Slot } from '../dtos'
import {
  DeleteSlotUseCase,
  GetSlotsUseCase,
  GetSlotUseCase,
  InsertSlotUseCase,
  UpdateSlotUseCase,
} from '../usecases/slot'

@Resolver(Slot)
export class SlotResolver {
  constructor(
    @Inject(UsecasesProxyModule.GET_SLOTS_USECASE)
    private readonly getSlotsProxy: UseCaseProxy<GetSlotsUseCase.UseCase>,
    @Inject(UsecasesProxyModule.GET_SLOT_USECASE)
    private readonly getSlotProxy: UseCaseProxy<GetSlotUseCase.UseCase>,
    @Inject(UsecasesProxyModule.INSERT_SLOT_USECASE)
    private readonly insertSlotProxy: UseCaseProxy<InsertSlotUseCase.UseCase>,
    @Inject(UsecasesProxyModule.DELETE_SLOT_USECASE)
    private readonly deleteSlotProxy: UseCaseProxy<DeleteSlotUseCase.UseCase>,
    @Inject(UsecasesProxyModule.UPDATE_SLOT_USECASE)
    private readonly updateSlotProxy: UseCaseProxy<UpdateSlotUseCase.UseCase>
  ) {}

  // @Directive('@dbConnection')
  // @Query(() => SlotsDataResponse)
  // async slots(
  //   @Args('input') input: PaginationParams,
  //   @Context() { dbConn }: HttpContext
  // ): Promise<SlotsDataResponse> {
  //   return this.getSlotsProxy.getInstance().perform({ input, dbConn })
  // }

  // @Directive('@dbConnection')
  // @Query(() => SlotResultUnion)
  // async slot(
  //   @Args('input') input: string,
  //   @Context() { dbConn }: HttpContext
  // ): Promise<typeof SlotResultUnion> {
  //   return this.getSlotProxy.getInstance().perform({ input, dbConn })
  // }

  // @Directive('@dbConnection')
  // @Mutation(() => Slot)
  // async insertSlot(
  //   @Args('input') input: SlotInput,
  //   @Context() { dbConn }: HttpContext
  // ): Promise<Product> {
  //   return this.insertSlotProxy.getInstance().perform({ input, dbConn })
  // }

  @Directive('@dbConnection')
  @Mutation(() => DefaultResponse)
  async deleteSlot(
    @Args('input') input: string,
    @Context() { dbConn }: HttpContext
  ): Promise<DefaultResponse> {
    return this.deleteSlotProxy.getInstance().perform({ input, dbConn })
  }

  // @Directive('@dbConnection')
  // @Mutation(() => SlotResultUnion)
  // async updateSlot(
  //   @Args('input') input: SlotUpdateParamsInput,
  //   @Context() { dbConn }: HttpContext
  // ): Promise<typeof SlotResultUnion> {
  //   return this.updateSlotProxy.getInstance().perform({ input, dbConn })
  // }
}
