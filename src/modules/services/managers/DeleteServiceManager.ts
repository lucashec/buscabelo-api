import IServiceRepository from '../repositories/iServiceRepository';

export default class DeleteServiceManager{
  constructor(private serviceRepository : IServiceRepository ){}
  public async execute(id: number){
    const service = this.serviceRepository.delete(id);

    return service;
  }
}
