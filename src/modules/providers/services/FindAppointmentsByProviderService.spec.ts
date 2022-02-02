import CreateProviderService from "./CreateProviderService";
import FakeProviderRepository from "../repositories/fakes/FakeProviderRepository";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import FindAppointmentsByProviderService from "./FindAppointmentsByProviderService";

const fakeRepository = new FakeProviderRepository();

const service =  new FindAppointmentsByProviderService(fakeRepository)
const createProviderService =  new CreateProviderService(fakeRepository)

describe('Filter Provider',() =>{
    it("should filter providers by name",async () =>{

		const id = "0"
		
        const appointments = await service.execute(id)

        expect(appointments).toBeInstanceOf(Array) 
    })

    it(`shouldn't return if provider does not exist`, async() =>{
        
        await expect(service.execute("8")
        ).rejects.toThrowError()
    })
    
})