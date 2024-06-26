import { Injectable } from '@nestjs/common'

import { MongoDbRepository } from '@/infra/db/repositories'

@Injectable()
export class ProductRepository extends MongoDbRepository {
  constructor() {
    super('products')
  }
}
