import MailTemplate from './HandlebarsMailTemplate';
import nodemailer from 'nodemailer';
interface INameAndEmail {
    name: string;
    email: string;
}
interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

interface ISendEmail {
    to: INameAndEmail;
    from?: INameAndEmail;
    subject: string;
    templateData: IParseMailTemplate;
}

class EthereoMail {
    async sendEmail({
        to,
        from,
        subject,
        templateData,
    }: ISendEmail): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const mailtemplate = new MailTemplate();
        const transport = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const message = await transport.sendMail({
            from: {
                name: from?.name || 'Equipe API Vendas',
                address: from?.email || 'equipe@apivendas.com',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await mailtemplate.parse(templateData),
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default EthereoMail;
