import SessionService from "./SessionService";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";

const fakeRepository = new FakeUserRepository();

const service =  new SessionService(fakeRepository)

describe('Create session',() =>{
    it("should be able to authenticate user's credentials",async () =>{

		const email = "user@email.com"
		const password = "123"
		
		//const user = await createCustomerService.execute({ name: "user", email, password })
	    
    	const session = await service.execute({email, password})

        expect(session).toBeInstanceOf(Object) 
    })

    it(`shouldn't be able to authenticate if user with credentials does not exists`, async() =>{

        await expect(service.execute({
            email: "user@email.com",
        	password: "1234"
        })
        ).rejects.toThrowError()
    })
    
})