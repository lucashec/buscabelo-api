import CreateProviderService from "./CreateProviderService";
import FakeProviderRepository from "../repositories/fakes/FakeProviderRepository";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import FindProviderByIdService from "./FindProviderByIdService";
import Provider from "../infra/typeorm/entities/Provider";

const fakeRepository = new FakeProviderRepository();

const service =  new FindProviderByIdService(fakeRepository)
const createProviderService =  new CreateProviderService(fakeRepository)

describe('Find Provider by id',() =>{
    it("should find a provider by id",async () =>{

		const email = "user@email.com"
		const password = "123"
		const name = "user"

    	const provider = await createProviderService.execute({ email, password, name })
                
        const foundProvider = await service.execute("0")

        expect(foundProvider).toBeInstanceOf(Object) 
    })

    it(`shouldn't return if provider with id does not exists`, async() =>{
        await expect(service.execute("10")
        ).rejects.toThrowError()
    })
    
})