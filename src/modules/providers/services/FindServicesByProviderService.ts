import Service from '@modules/services/infra/typeorm/entities/Service';
<<<<<<< HEAD
import IProviderRepository from '../repositories/IProviderRepository';

export default class FindServicesByProviderService {
  constructor(private providerRepository : IProviderRepository){}
=======
import { injectable, inject } from 'tsyringe';
import IProviderRepository from '../repositories/IProviderRepository';

@injectable()
export default class FindServicesByProviderService {
  constructor(
    @inject("ProviderRepository")
    private providerRepository: IProviderRepository
    ){}
>>>>>>> master

  public async execute(id: string): Promise<Service[]> {
    const provider = await this.providerRepository.findById(id);
    const services = provider?.services;

    if(!services) {
      throw new Error ('no services found!');
    }

    return services;
  }

}