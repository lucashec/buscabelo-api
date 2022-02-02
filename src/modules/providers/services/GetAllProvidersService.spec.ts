import GetAllProvidersService from "./GetAllProvidersService";
import FakeProviderRepository from "../repositories/fakes/FakeProviderRepository";

const fakeRepository = new FakeProviderRepository();

const service =  new GetAllProvidersService(fakeRepository)

describe('Get all providers',() =>{
    it("should list all the providers",async () =>{
		
    	let providers = await service.execute()
        
        expect(providers).toBeInstanceOf(Array) 
    })
})