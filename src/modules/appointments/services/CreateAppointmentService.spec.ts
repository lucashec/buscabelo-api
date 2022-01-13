import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentRepository";
const fakeRepository = new FakeAppointmentRepository();
const service =  new CreateAppointmentService(fakeRepository)

describe('Create appointment',() =>{
    it('should be able to create a new appointment',async () =>{
        const appointment =  await service.execute({
            appointment_to: new Date(),
            scheduled_at: new Date(),
            provider:'123',
            customer:'456',
            service:'1'
        });
        expect(appointment.provider).toBe('123') 
    })

    it(`shouldn't be able to create appointment at same time for twice`, async() =>{
        const appointmentDate = new Date(2022, 6, 16, 16, 0, 0);

        await service.execute({
            appointment_to: appointmentDate,
            scheduled_at: new Date(),
            provider:'123',
            customer:'456',
            service:'1'
        });
        await expect(service.execute({
            appointment_to: appointmentDate,
            scheduled_at: new Date(),
            provider:'123',
            customer:'456',
            service:'1'
        })
        ).rejects.toThrowError()
    })

    it(`shouldn't be able to create appointment on a past date`, async() =>{
        const appointmentDate = new Date(2020, 6, 16, 16, 0, 0);

        await expect(service.execute({
            appointment_to: new Date(),
            scheduled_at: new Date(),
            provider:'123',
            customer:'456',
            service:'1'
        })
        ).rejects.toThrowError()
    })

    it(`shouldn't be able to create appointment on the customer and provider are the same`, async() =>{
        await expect(service.execute({
            appointment_to: new Date(),
            scheduled_at: new Date(),
            provider:'123',
            customer:'123',
            service:'1'
        })
        ).rejects.toThrowError()
    })
    
})