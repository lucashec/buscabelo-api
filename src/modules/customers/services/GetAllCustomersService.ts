import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import ICustomerRepository from '../repositories/ICustomerRepository';

export default class GetAllCustomerService {
  constructor(private CustomerRepository: ICustomerRepository){}
  public async execute(): Promise<Customer[] | undefined>{
    const users = await this.CustomerRepository.find();
    return users;
  }
}
