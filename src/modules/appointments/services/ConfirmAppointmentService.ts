import { inject, injectable } from "tsyringe";
import IAppointmentRepository from "../repositories/IAppointmentRepository";

@injectable()
export default class ConfirmAppointmentService{
    constructor(
    @inject('AppointmentRepository')
    private AppointmentRepository: IAppointmentRepository){}

    public async execute(id: number){
        const appointment = await this.AppointmentRepository.findAppointmentById(12);
        this.AppointmentRepository.
    }
}