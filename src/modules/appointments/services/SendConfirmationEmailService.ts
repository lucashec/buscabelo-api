import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import Provider from "@modules/providers/infra/typeorm/entities/Provider";
import IMailProvider from "@shared/containers/providers/MailProvider/models/IMailProvider";
import { inject } from "tsyringe";

export default class SendConfirmationEmailService{

    constructor(
        @inject('MailProvider')
        private MailProvider: IMailProvider
    ){}
    // provider: Provider, customer: Customer, date : Date
    public async execute(){
        await this.MailProvider.sendMail({
            to: {
                name: 'Lucas',
                email: 'lucashenriqueev@gmail.com'
            },
            subject: '[Buscabelo] Confirmar agendamento',
            templateData: {
                file:'Olá, {{name}}',
                variables:{
                    provider_name: 'Lulinha'
                }
            }
        });
}
}