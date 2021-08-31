import faker from 'faker';
import { getRepository }from 'typeorm';
import { parseISO, format } from 'date-fns';
import Customer from '../app/models/Customer';
import Provider from '../app/models/Provider';
import Service from '../app/models/Service';
import ProviderService from '../app/services/ProviderService';
import CustomerService from '../app/services/CustomerService';
import CreateServiceHelper from '../app/services/CreateServiceHelper';
import CreateAppointmentService from '../app/services/CreateAppointmentService';

const providerService = new ProviderService();
const customerService = new CustomerService();
const serviceHelper = new CreateServiceHelper();
const appointmentService =  new CreateAppointmentService();

faker.locale = 'pt_BR';

export async function createUsers() {
  try{
    for (let i = 0; i < 20; i++) {

      const provider_name = faker.name.findName();
      let provider = {
        name: provider_name,
        password: faker.internet.password(10),
        email: faker.internet.email(provider_name),
        description: faker.company.catchPhraseDescriptor(),
      }
      providerService.execute(provider);
    
      const customer_name = faker.name.findName();
      let customer = {
        name: customer_name,
        password: faker.internet.password(10),
        email: faker.internet.email(customer_name),
      }
      customerService.execute(customer);
      console.log('- 20 customers created');
      console.log('- 20 providers created');
    } 
  } catch (err){
    throw new Error(err);
  }
  
}

export async function createServices() {
  const providers = await getRepository(Provider).find();

  try {
    for await (let provider of providers) {
      let service = {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        value: Number(faker.commerce.price()),
        // duration: faker.datatype.number(60),
        provider
      }
    
      serviceHelper.execute(service);
      console.log('- 20 services created');
    }
  } catch (err){
    throw new Error(err);
  }
  
}

export async function createAppointments() {
  const customers = await getRepository(Customer).find(); 
  const providers = await getRepository(Provider).find();
  const services = await getRepository(Service).find();
  const timeNow = parseISO(format(new Date, 'yyyy-MM-dd'));

  for (let i = 0; i < 20; i++) {
    let appointment = {
      scheduled_at: timeNow,
      appointment_to: faker.date.future(),
      provider: providers[i],
      customer: customers[i],
      service: services[i]
    }

    appointmentService.execute(appointment);
  }
}

createUsers(); 
createServices();
createAppointments();

