import IProviderRepository from '@modules/providers/repositories/IProviderRepository'
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import IUserDTO from '@modules/users/dtos/IUserDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default class ProviderRepository implements IProviderRepository{
  private providers : Provider[] = []
  
  public constructor(){
    
    this.providers.push({
      id: "0",
			email: "mock@email.com",
			name: "mock@email.com",
			password: "mock",
			description: "",
			address: "",
      appointments: [ new Appointment() ],
      services: [],
      avatar: "",
			rating_average: 0
    })

  }
  public async create(userDTO: IUserDTO): Promise<Provider>{

		const provider = new Provider()
		
		Object.assign(provider,{
      id: this.providers.length.toString(),
			email: userDTO.email,
			name: userDTO.name,
			password: userDTO.password,
			description: "",
			address: "",
      appointments: [],
			rating_average: 0
		})

		this.providers.push(provider)
		
		return provider;
  }
  public async findById(id: string): Promise<Provider | undefined>{
    const provider = this.providers.find(_provider => _provider.id == id);
    return provider;
  }
  public async find(): Promise<Provider[] | undefined>{
    return this.providers
  }
  public async findByEmail(email: string): Promise<Provider | undefined>{
    const provider = this.providers.find( _provider => _provider.email == email)
    return provider;
  }
  public async filterByName(name: string): Promise<Provider[] | undefined>{
    const providers = this.providers.filter(_provider => _provider.name?.includes(name));
    return providers;
  }
}