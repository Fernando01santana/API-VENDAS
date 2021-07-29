import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EthereoEmail from '@config/mail/EthereoEmail';
import handlebars from 'handlebars';
import path from 'path';

interface IRequest {
    email: string;
}

class SendForgoutPassowrdService {
    async execute({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const userExists = await userRepository.findByEmail(email);

        const forgoutPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgout_password.hbs',
        );

        if (!userExists) {
            throw new AppError(
                'Nenhum usuario encontrado com o email informado!',
                401,
            );
        }
        const generateTOkenRepository =
            getCustomRepository(UserTokensRepository);
        const generateToken = await generateTOkenRepository.generate(
            userExists.id,
        );

        const sendMail = new EthereoEmail();
        await sendMail.sendEmail({
            to: {
                name: userExists.name,
                email: userExists.email,
            },
            subject: '[API vendas recuperação de senha]',
            templateData: {
                file: forgoutPasswordTemplate,
                variables: {
                    name: userExists.name,
                    link: `http://localhost:3333/reset_password?token=${generateToken.token}`,
                },
            },
        });
        return;
    }
}

export default SendForgoutPassowrdService;
