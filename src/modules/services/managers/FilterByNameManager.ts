import Service from '@modules/services/infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/iServiceRepository';

export default class FilterByNameManager{
  constructor(
    private serviceRepository : IServiceRepository
    ){}

  public async execute(name: any): Promise<Service[]> {

    if(name == "") throw new Error ('The field is empty!');

    const services = await this.serviceRepository.filterByName(name);

    if(!services || services.length == 0) {
      throw new Error ('services not found');
    }

    return services;
  }

}
