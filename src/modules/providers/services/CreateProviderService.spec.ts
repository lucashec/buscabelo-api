import CreateProviderService from "./CreateProviderService";
import FakeProviderRepository from "../repositories/fakes/FakeProviderRepository";
import Provider from "../infra/typeorm/entities/Provider";

const fakeRepository = new FakeProviderRepository();

const service =  new CreateProviderService(fakeRepository)

describe('Create Provider',() =>{
    it("should create a provider",async () =>{

		const email = "user@email.com"
		const password = "123"
		const name = "user"
		
		//const user = await createCustomerService.execute({ name: "user", email, password })
	    
    	const provider = await service.execute({ email, password, name })

        expect(provider).toBeInstanceOf(Provider) 
    })

    it(`shouldn't create provider if email already exists in database`, async() =>{
        const email = "mock@email.com"
		const password = "123"
        
        expect(service.execute({
            email,
        	password
        })
        ).rejects.toThrowError()
    })
    
})