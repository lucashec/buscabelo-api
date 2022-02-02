import FilterByNameService from "./FilterByNameService";
import CreateProviderService from "./CreateProviderService";
import FakeProviderRepository from "../repositories/fakes/FakeProviderRepository";
import Provider from "../infra/typeorm/entities/Provider";

const fakeRepository = new FakeProviderRepository();

const service =  new FilterByNameService(fakeRepository)
const createProviderService =  new CreateProviderService(fakeRepository)

describe('Filter Provider',() =>{
    it("should filter providers by name",async () =>{

		const email = "user@email.com"
		const email2 = "user2@email.com"
		const password = "123"
		const name1 = "user"
		const name2 = "user2"
		
		//const user = await createCustomerService.execute({ name: "user", email, password })
	    
    	await createProviderService.execute({ email, password, name1 })
    	await createProviderService.execute({ email2, password, name2 })
        
        const providers = await service.execute(name1)

        expect(providers).toBeInstanceOf(Array) 
    })

    it(`shouldn't return if no name is given`, async() =>{
        await expect(service.execute("")
        ).rejects.toThrowError()
    })
    
})