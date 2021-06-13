import {getRepository} from 'typeorm'
import Customer from '../app/models/Customer';

interface Request{
  email: string;
  password: string;
}
export default class CreateCustomerService{
  public async execute({email, password}:Request): Promise<Customer> {
    const customerRepository = getRepository(Customer);

    const checkcustomerExists =  await customerRepository.findOne({
      where: {email},
    });

    if (checkcustomerExists){
      throw new Error ('Email address already used');
    }

    const customer = customerRepository.create({
      email,
      password,
    });

    await customerRepository.save(customer);

    return customer;
  }
}