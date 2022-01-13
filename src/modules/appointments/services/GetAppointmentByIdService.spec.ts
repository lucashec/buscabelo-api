import GetAppointmentByIdService from "./GetAppointmentByIdService";
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentRepository";
const fakeRepository = new FakeAppointmentRepository();
const service = new GetAppointmentByIdService(fakeRepository);

describe('Get appointments by id', () => {
    it('should be able to list a appointment by id', async () =>{
        const appointment1 = await fakeRepository.create({
            provider: '123',
            customer: '456',
            appointment_to: new Date(),
            scheduled_at: new Date(),
            service: '1'
        })
        const appointment = await service.execute(1)
        expect(appointment?.id).toEqual(1)
    })
})
