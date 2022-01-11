<<<<<<< HEAD
import Service from '../infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/iServiceRepository';

export default class FindServiceByIdManager{
  constructor(private serviceRepository : IServiceRepository ){}
=======
import { injectable, inject } from 'tsyringe';
import Service from '../infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/iServiceRepository';

@injectable()
export default class FindServiceByIdManager{
  constructor(
    @inject("ServiceRepostiory")
    private serviceRepository : IServiceRepository
    ){}
>>>>>>> master
  public async execute(id: number): Promise<Service> {

    const service = await this.serviceRepository.findById(id);

    if(!service) {
      throw new Error ('no service found!');
    }

    return service;
  }
}
