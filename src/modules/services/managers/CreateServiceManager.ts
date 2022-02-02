import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import Service from '@modules/services/infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/iServiceRepository';
import IProviderRepository from '@modules/customers/repositories/ICustomerRepository';
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';

interface IService{
  name: string;
  description: string;
  value: number;
  provider: Provider;
}

export default class CreateServiceManager{
    constructor(
    private serviceRepository : IServiceRepository, 
    private providerRepository : ICustomerRepository
    ){}

  public async execute(newService:IService): Promise<Service> {
   
    const checkIsCustomer =  await this.providerRepository.findById(newService.provider.id);

    // if(checkIsCustomer){
    //   throw new Error ('User must be a provider');
    // }

    const service = this.serviceRepository.create(newService);

    return service;
  }
}
