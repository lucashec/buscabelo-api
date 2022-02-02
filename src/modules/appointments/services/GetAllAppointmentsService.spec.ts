import GetAllAppointmentsService from "./GetAllAppointmentsService";
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentRepository";
const fakeRepository = new FakeAppointmentRepository();
const service = new GetAllAppointmentsService(fakeRepository);

describe('Get all appointments', () => {
    it('should be able to list all appointments', async () =>{
        const appointment1 = await fakeRepository.create({
            provider: '123',
            customer: '456',
            appointment_to: new Date(),
            scheduled_at: new Date(),
            service: '1'
        })
        const appointment2 = await fakeRepository.create({
            provider: '123',
            customer: '546',
            appointment_to: new Date(),
            scheduled_at: new Date(),
            service: '1'
        })
        const appointments = await service.execute()
        expect(appointments).toEqual([appointment1, appointment2])
    })
})
