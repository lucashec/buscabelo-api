<<<<<<< HEAD
import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import ICustomerRepository from '../repositories/ICustomerRepository';

export default class GoogleAuthService {
  constructor(private CustomerRepository: ICustomerRepository){}
=======
import ICustomerRepository from '../repositories/ICustomerRepository';
import { injectable, inject } from "tsyringe";

@injectable()
export default class GoogleAuthService {
  constructor(
    @inject("CustomerRepository")
    private CustomerRepository: ICustomerRepository
    ){}
>>>>>>> master
  public async execute(userEmail: string): Promise<Boolean> {
    
    const checkcustomerExists =  await this.CustomerRepository.findByEmail(userEmail);
  
    if (checkcustomerExists){return true}
    return false;
  }
} 
