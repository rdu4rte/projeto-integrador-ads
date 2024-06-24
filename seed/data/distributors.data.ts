import { ObjectId } from 'mongodb'

import { Distributor, DistributorSegment } from '../../src/application/dtos'

export const distributors: Distributor[] = [
  {
    _id: new ObjectId('6678bdbc376cf44260cb3cb4'),
    name: 'Distributor1',
    segment: DistributorSegment.beautyAndCosmeticsStores,
    createAt: new Date(),
    updateAt: new Date(),
    active: true,
    contact: {
      email: 'distributor1@mail.com',
      phone: '+5541999993333',
      address: 'Distributor 1 Address',
    },
  },
  {
    _id: new ObjectId('6678be1691ab7dc8fc6bb9af'),
    name: 'Distributor2',
    segment: DistributorSegment.electronicsAndApplianceStores,
    createAt: new Date(),
    updateAt: new Date(),
    active: true,
    contact: {
      email: 'distributor2@mail.com',
      phone: '+5541999998888',
      address: 'Distributor 2 Address',
    },
  },
]
