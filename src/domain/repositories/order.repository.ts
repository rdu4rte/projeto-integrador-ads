import { Injectable } from '@nestjs/common'

import { MongoDbRepository } from '@/infra/db/repositories'

@Injectable()
export class OrderRepository extends MongoDbRepository {
  constructor() {
    super('orders')
  }
}
