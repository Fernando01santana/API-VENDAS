import AppError from '../../../shared/errors/AppError';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import EthereoEmail from '../../../config/mail/EthereoEmail';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import BcryptHashProvider from '../providers/HashProvider/implementation/BcryptHashProvider';

@injectable()
class SendForgoutPassowrdService {
    constructor(
        @inject('BcryptHash')
        private bcryptHash: BcryptHashProvider,
        @inject('UserRepositorie')
        private userRepository: UserRepository,
    ) { }
    async execute(email: string): Promise<void> {
        const userExists = await this.userRepository.findByEmail(email);

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
        const generateToken = await this.bcryptHash.generateHsh(userExists.id);

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
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${generateToken}`,
                },
            },
        });
        return;
    }
}

export default SendForgoutPassowrdService;
