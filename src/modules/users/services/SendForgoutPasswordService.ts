import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/Users';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import EthereoEmail from '../../../config/mail/EthereoEmail';
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
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${generateToken.token}`,
                },
            },
        });
        return;
    }
}

export default SendForgoutPassowrdService;
