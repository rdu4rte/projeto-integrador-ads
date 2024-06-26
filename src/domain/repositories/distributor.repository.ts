import { Injectable } from '@nestjs/common'

import { MongoDbRepository } from '@/infra/db/repositories'

@Injectable()
export class DistributorRepository extends MongoDbRepository {
  constructor() {
    super('distributors')
  }
}
