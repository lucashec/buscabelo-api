import UpdateAppointmentService from "./UpdateAppointmentService";
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentRepository";
const fakeRepository = new FakeAppointmentRepository();
const service = new UpdateAppointmentService(fakeRepository);

describe('Update appointment', () => {
    it('should update an appointment', async () =>{
      const foundAppointment = await fakeRepository.findAppointmentById(0);
      
      const appointment = await service.execute(0, { id: 10 });

      expect(appointment?.id).not.toEqual(foundAppointment?.id)
    })
})
