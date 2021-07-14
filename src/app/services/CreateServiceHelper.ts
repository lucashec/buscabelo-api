import {getRepository, ILike} from 'typeorm'

import Customer from '../models/Customer';
import Provider from '../models/Provider';
import Service from '../models/Service';

interface IService{
  name: string;
  description: string;
  value: number;
  provider: Provider;
}

export default class CreateServiceHelper{

  public async find(providerId: string): Promise<Service[]>{
    const repository = getRepository(Service);

    const services = await repository.find({provider: {id: providerId}})

    return services;
  }

  public async findOne(id: number) {
    const repository = getRepository(Service);

    const service = await repository.findOne({id: id});

    if(!service) {
      throw new Error ('no service found!');
    }

    return service;
  }

  public async filterName(name: any): Promise<Service[]> {

    if(name == "") throw new Error ('Nenhuma informação enviada!');

    const repository = getRepository(Service);

    const services = await repository.find({
      name: ILike(`%${name}%`)
    })

    if(!services || services.length == 0) {
      throw new Error ('Serviços não informados');
    }

    return services;
  }

  public async execute(newService:IService): Promise<Service> {
    const serviceRepository = getRepository(Service);
    const customerRepository = getRepository(Customer);

    const checkIsCustomer =  await customerRepository.findOne({
      where: {id:newService.provider},
    });

    if(checkIsCustomer){
      throw new Error ('User must be a provider');
    }

    const service = serviceRepository.create(newService);

    await serviceRepository.save(service);

    return service;
  }

  public async update(id: number, updateService : IService){
    const serviceRepository = getRepository(Service);
    const customerRepository = getRepository(Customer);

    const service = serviceRepository.update(id, updateService);

    return service;
  }

  public async delete(id: number){
    const serviceRepository = getRepository(Service);

    const service = serviceRepository.delete(id);

    return service;
  }
}
