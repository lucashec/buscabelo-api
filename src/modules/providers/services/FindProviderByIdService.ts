<<<<<<< HEAD
import IProviderRepository from '../repositories/IProviderRepository';

export default class FindProviderByIdService {
  constructor(private providerRepository : IProviderRepository){}
=======
import { injectable, inject } from 'tsyringe';
import IProviderRepository from '../repositories/IProviderRepository';

@injectable()
export default class FindProviderByIdService {
  constructor(
    @inject("ProviderRepository")
    private providerRepository: IProviderRepository
    ){}
>>>>>>> master

  public async execute(id: string) {
    const provider = await this.providerRepository.findById(id);
  
    if(!provider) {
      throw new Error ('no provider found!');
    }

    return provider;
  }

}