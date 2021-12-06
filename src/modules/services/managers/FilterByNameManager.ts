import Service from '@modules/services/infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/iServiceRepository';

export default class FilterByNameManager{
  constructor(private serviceRepository : IServiceRepository ){}

  public async execute(name: any): Promise<Service[]> {

    if(name == "") throw new Error ('Nenhuma informação enviada!');

    const services = await this.serviceRepository.filterByName(name);

    if(!services || services.length == 0) {
      throw new Error ('Serviços não informados');
    }

    return services;
  }

}
