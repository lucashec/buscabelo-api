import Service from '@modules/services/infra/typeorm/entities/Service';
import IProviderRepository from '../repositories/IProviderRepository';

export default class FindServicesByProviderService {
  constructor(
    private providerRepository: IProviderRepository
    ){}

  public async execute(id: string): Promise<Service[]> {
    const services = await this.providerRepository.findServicesByProvider(id);

    if(!services) {
      throw new Error ('no services found!');
    }

    return services;
  }

}