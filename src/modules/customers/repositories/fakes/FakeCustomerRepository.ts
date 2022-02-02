import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import IUserDTO from '@modules/users/dtos/IUserDTO';
import { v4 as uuidv4 } from 'uuid';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';


export default class CustomerRepository implements ICustomerRepository{
    private customers : Customer [] = []
    
    public async create({name, email, password}: IUserDTO): Promise<Customer>{
        
        const customer = new Customer();
        
        Object.assign(customer, {
            id: uuidv4(),
            name,
            email,
            password,
            type: "Customer"
        })

        this.customers.push(customer)

        return customer;
    }
    public async findById(id: string): Promise<Customer | undefined>{
      const customer = this.customers.find(_customer => _customer.id == id);
      
      return customer;
    }
    public async find(): Promise<Customer[] | undefined>{
      return this.customers;
    }
    public async findByEmail(email: string): Promise<Customer | undefined>{
      const customer = this.customers.find(_customer => _customer.email == email)
      return customer;
    }
    public async findAppointmentsByCustomer(id: string): Promise<Appointment[] | undefined>{
      return
    }
  }