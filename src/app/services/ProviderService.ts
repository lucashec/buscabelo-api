import { hash } from 'bcryptjs';
import { getRepository, Like } from 'typeorm';

import Provider from '../models/Provider';
import IUser from '../interface/IUser';
import Service from '../models/Service';

export default class ProviderService {

  public async find(): Promise<Provider[]> {
    const repository = getRepository(Provider);

    const provider = await repository.find();

    return provider;
  }

  public async findOne(id: string) {
    const repository = getRepository(Provider);

    const provider = await repository.findOne({id: id});

    if(!provider) {
      throw new Error ('no provider found!');
    }

    return provider;
  }

  public async filterName(name: any): Promise<Provider[]> {

    if(name == "") throw new Error ('Nenhuma informação enviada!');

    const repository = getRepository(Provider);
    
    const providers = await repository.find({
      name: Like(`%${name}%`)
    });

    return providers;
  }

  public async findServicesProvider(id: string): Promise<Service[]> {
    const repository = getRepository(Service);

    const services = await repository.find({provider: { id: id}});

    if(!services) {
      throw new Error ('no services found!');
    }

    return services;
  }

  public async execute(newProvider: IUser): Promise<Provider> {

    const repository = getRepository(Provider);
    
    const checkProviderExists =  await repository.findOne({
      where: {email:newProvider.email},
    });

    if (checkProviderExists) throw new Error ('Email address already used');

    const hashedPassword = await hash(newProvider.password, 8);
    const provider = repository.create({
      name: newProvider.name,
      email: newProvider.email,
      password: hashedPassword,
    });

    await repository.save(provider);
  
    provider.password = '';
    
    return provider;
  }
}