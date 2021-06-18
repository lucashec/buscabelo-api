import { hash } from 'bcryptjs';
import {getRepository} from 'typeorm'

import Customer from '../models/Customer';

interface ICustomer{
  name: string,
  email: string;
  password: string;
}

export default class CustomerService{

  public async find(): Promise<Customer[]>{
    const repository = getRepository(Customer);

    const users = await repository.find()

    if(users.length < 0) {
      throw new Error ('no users found!');
    }

    return users;
  }

  public async execute(newCustomer: ICustomer): Promise<Customer> {

    const repository = getRepository(Customer);
    
    const checkcustomerExists =  await repository.findOne({
      where: {email:newCustomer.email},
    });

    if (checkcustomerExists){
      throw new Error ('Email address already used');
    }
    const hashedPassword = await hash(newCustomer.password, 8);
    const customer = repository.create({
      name: newCustomer.name,
      email: newCustomer.email,
      password: hashedPassword,
    });

    await repository.save(customer);
  
    customer.password = '';
    
    return customer;
  }
}
