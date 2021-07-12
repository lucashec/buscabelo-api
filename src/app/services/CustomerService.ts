import { hash } from 'bcryptjs';
import {getRepository} from 'typeorm'

import Customer from '../models/Customer';
import Appointment from '../models/Appointment';
import IUser from '../interface/IUser';

export default class CustomerService {

  public async find(): Promise<Customer[]>{
    const repository = getRepository(Customer);

    const users = await repository.find()

    return users;
  }

  public async execute(newCustomer: IUser): Promise<Customer> {

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

  public async findAppointmentsCustomer(id: string): Promise<Appointment[]> {
    const repository = getRepository(Appointment);

    const appointments = await repository.find({customer: { id: id}});

    if(!appointments) {
      throw new Error ('no services found!');
    }

    return appointments;
  }
}
