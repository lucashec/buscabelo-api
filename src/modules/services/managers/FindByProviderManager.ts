import Service from '@modules/services/infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/iServiceRepository';

export default class FindByProviderManager{
  constructor(
    private serviceRepository : IServiceRepository
    ){}

  public async execute(providerId: string): Promise<Service[] | undefined>{

    const services = await this.serviceRepository.findByProvider(providerId);

    return services;
  }
}