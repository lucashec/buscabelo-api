<<<<<<< HEAD
import Provider from '../infra/typeorm/entities/Provider'
import IProviderRepository from '../repositories/IProviderRepository';

export default class FilterByNameService {
  constructor(private providerRepository : IProviderRepository){}
=======
import { injectable , inject} from 'tsyringe';
import Provider from '../infra/typeorm/entities/Provider'
import IProviderRepository from '../repositories/IProviderRepository';

@injectable()
export default class FilterByNameService {
  constructor(
    @inject("ProviderRepository")
    private providerRepository: IProviderRepository
    ){}
>>>>>>> master

  public async execute(name: any): Promise<Provider[] | undefined> {

    if(name == "") throw new Error ('No name was sended');

    const providers = await this.providerRepository.filterByName(name);

    return providers;
  }

}