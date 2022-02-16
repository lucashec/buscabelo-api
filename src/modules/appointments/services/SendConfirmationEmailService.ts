import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import Provider from "@modules/providers/infra/typeorm/entities/Provider";
import IMailProvider from "@shared/containers/providers/MailProvider/models/IMailProvider";
import path from 'path'
import { inject, injectable } from "tsyringe";

@injectable()
export default class SendConfirmationEmailService{

    constructor(
        @inject('MailProvider')
        private MailProvider: IMailProvider
    ){}
    public async execute(
        provider: Provider,
        date : string, 
        id: number
        ){
    const confirmTempalte = path.resolve(
        __dirname,
        "..",
        "views",
        "confirm.hbs"
    )

    await this.MailProvider.sendMail({
        to: {
        name: provider.name,
        email: provider.email
        },
        subject: '[Buscabelo] Confirmar agendamento',
        templateData: {
        file: confirmTempalte,
        variables:{
            link: `http://localhost/v1/appointments/confirm/${id}`,
            name: provider.name,
            date: date,
           }
        }
    });
}
}