import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    async execute({ token, password }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const generateTOkenRepository =
            getCustomRepository(UserTokensRepository);

        //verify token
        const userToken = await generateTOkenRepository.findByToken(token);
        if (!userToken) {
            throw new AppError('Token do usuario informado nao existe!', 401);
        }

        //verify user
        const user = await userRepository.findById(userToken.user_id);
        if (!user) {
            throw new AppError('Usuario não encontrado!', 401);
        }

        //verify date of token
        const compareDate = addHours(userToken.created_at, 2);

        //compare date now and compareDate
        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token invalido!', 401);
        }

        user.password = await hash(password, 8);
        await userRepository.save(user);
    }
}

export default ResetPasswordService;
