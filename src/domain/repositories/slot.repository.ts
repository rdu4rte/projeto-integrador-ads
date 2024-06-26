import { Injectable } from '@nestjs/common'

import { MongoDbRepository } from '@/infra/db/repositories'

@Injectable()
export class SlotRepository extends MongoDbRepository {
  constructor() {
    super('slots')
  }
}
