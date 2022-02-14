import nodemailer, { Transporter } from "nodemailer";
import { injectable, inject } from "tsyringe";

import IMailTemplateProvider from "@shared/containers/providers/MailTemplateProvider/models/IMailTemplateProvider";
import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendEmailDTO";

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "albertha.schoen98@ethereal.email",
        pass: "8DfWYV57vJrDF2TEkK",
      },
    });

    this.client = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || "Equipe Buscabelo",
        address: from?.email || "equipe@buscabelo.com.br",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}