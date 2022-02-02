import GoogleAuth from "./GoogleAuth";
import CreateCustomerService from "./CreateCustomerService";
import FakeCustomerRepository from "../repositories/fakes/FakeCustomerRepository";

const fakeRepository = new FakeCustomerRepository();

const goggleAuthService =  new GoogleAuth(fakeRepository)
const createCustomerService =  new CreateCustomerService(fakeRepository)

describe('Find customer by email',() => {
    it('should be able to find customer by email',async () =>{
        await createCustomerService.execute({ 
            email: "user@email.com",
            name: "user",
            password: "123"
        })
        
        const customer =  await goggleAuthService.execute("user@email.com");

        expect(customer).toBe(true) 
    })

    it('should not be able to find customer by email',async () =>{
        
        const customer =  await goggleAuthService.execute("user2@email.com");

        expect(customer).toBe(false) 
    })
})