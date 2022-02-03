import IServiceDTO from '../dtos/IServiceDTO';
import IServiceRepository from '../repositories/iServiceRepository';

export default class UpdateServiceManager{
  constructor(
    private serviceRepository : IServiceRepository
    ){}

  public async execute(id: number, updateService : IServiceDTO){
    
    const service = this.serviceRepository.update(id, updateService);

    return service;
  }

}
