<<<<<<< HEAD
import IServiceRepository from '../repositories/iServiceRepository';

export default class DeleteServiceManager{
  constructor(private serviceRepository : IServiceRepository ){}
=======
import { injectable, inject } from 'tsyringe';
import IServiceRepository from '../repositories/iServiceRepository';

@injectable()
export default class DeleteServiceManager{
  constructor(
    @inject("ServiceRepostiory")
    private serviceRepository : IServiceRepository
    ){}
>>>>>>> master
  public async execute(id: number){
    const service = this.serviceRepository.delete(id);

    return service;
  }
}
