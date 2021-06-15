import {getRepository} from 'typeorm'

import Customer from '../models/Customer';

interface ICustomer{
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
      where: newCustomer.email,
    });

    if (checkcustomerExists){
      throw new Error ('Email address already used');
    }

    const customer = repository.create(newCustomer);

    await repository.save(customer);

    return customer;
  }
}