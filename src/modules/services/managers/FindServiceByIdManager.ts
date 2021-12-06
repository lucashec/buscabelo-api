import Service from '../infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/iServiceRepository';

export default class FindServiceByIdManager{
  constructor(private serviceRepository : IServiceRepository ){}
  public async execute(id: number): Promise<Service> {

    const service = await this.serviceRepository.findById(id);

    if(!service) {
      throw new Error ('no service found!');
    }

    return service;
  }
}
