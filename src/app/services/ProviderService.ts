import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import Provider from '../models/Provider';
import IUser from '../interface/IUser';

export default class ProviderService {

  public async find(): Promise<Provider[]> {
    const repository = getRepository(Provider);

    const provider = await repository.find();

    if(provider.length < 0) throw new Error('no provides found');

    return provider;
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