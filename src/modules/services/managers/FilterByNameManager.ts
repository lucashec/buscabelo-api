import Service from '@modules/services/infra/typeorm/entities/Service';
<<<<<<< HEAD
import IServiceRepository from '../repositories/iServiceRepository';

export default class FilterByNameManager{
  constructor(private serviceRepository : IServiceRepository ){}
=======
import { injectable, inject } from 'tsyringe';
import IServiceRepository from '../repositories/iServiceRepository';

@injectable()
export default class FilterByNameManager{
  constructor(
    @inject("ServiceRepostiory")
    private serviceRepository : IServiceRepository
    ){}
>>>>>>> master

  public async execute(name: any): Promise<Service[]> {

    if(name == "") throw new Error ('Nenhuma informação enviada!');

    const services = await this.serviceRepository.filterByName(name);

    if(!services || services.length == 0) {
      throw new Error ('Serviços não informados');
    }

    return services;
  }

}
