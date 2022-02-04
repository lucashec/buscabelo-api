import IProviderRepository from '../repositories/IProviderRepository';

export default class FindProviderByIdService {
  constructor(
    private providerRepository: IProviderRepository
    ){}

  public async execute(id: string) {
    const provider = await this.providerRepository.findById(id);
  
    if(!provider) {
      throw new Error ('no provider found!');
    }

    return provider;
  }

}