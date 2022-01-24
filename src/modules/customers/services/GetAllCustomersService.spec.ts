import GetAllCustomersService from "./GetAllCustomersService";
import FakeCustomerRepository from "../repositories/fakes/FakeCustomerRepository";

const fakeRepository = new FakeCustomerRepository();
const service =  new GetAllCustomersService(fakeRepository)

describe('Find all customers',() => {
    it('should be able to list all customers',async () =>{
        const customer =  await service.execute();

        expect(customer).toBeInstanceOf(Array)
    })
})