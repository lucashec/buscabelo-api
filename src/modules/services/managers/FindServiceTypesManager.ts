import { inject, injectable } from 'tsyringe';

import IServiceRepository from '../repositories/iServiceRepository';

@injectable()
export default class FindServiceTypesManager{
  constructor(
    @inject('ServiceRepository')
    private serviceRepository : IServiceRepository
  ) {}

  public async execute(){
    const types = this.serviceRepository.findServiceTypes();
    return types;
  }
}
