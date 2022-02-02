import Service from "@modules/services/infra/typeorm/entities/Service";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import Provider from "@modules/providers/infra/typeorm/entities/Provider";

export default interface IAppointmentDTO{
  provider: String;
  customer: String;
  appointment_to: Date;
  scheduled_at: Date;
  service: String;
}
