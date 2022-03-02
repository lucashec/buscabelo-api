import nodemailer, { Transporter } from "nodemailer";
import { injectable, inject } from "tsyringe";
import aws from 'aws-sdk';
import IMailTemplateProvider from "@shared/containers/providers/MailTemplateProvider/models/IMailTemplateProvider";
import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendEmailDTO";

@injectable()
export default class SESEmailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
        SES: new aws.SES({
            apiVersion: '2010-12-01',
            region: 'us-east-1'
        })
    })
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
        from: {
          name: from?.name || "Equipe Buscabelo",
          address: from?.email || "equipe@apibuscabelo.online",
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });
}
}