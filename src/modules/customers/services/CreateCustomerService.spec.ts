import CreateCustomerService from "./CreateCustomerService";
import FakeCustomerRepository from "../repositories/fakes/FakeCustomerRepository";
const fakeRepository = new FakeCustomerRepository();
const service =  new CreateCustomerService(fakeRepository)

describe('Create appointment',() => {
    it('should be able to create a new customer',async () =>{
        const customer =  await service.execute({
            email: "email@email.com",
            password: "123",
            name: "user"
        });
        expect(customer.name).toBe('user') 
    })

    it(`shouldn't be able to create a customer with email that already exists`, async() =>{
        const email = "user@email.com"

        await service.execute({
            email: email,
            password: "123",
            name: "user"
        });
        await expect(service.execute({
            email: email,
            password: "123",
            name: "user"
        })
        ).rejects.toThrowError()
    })
})