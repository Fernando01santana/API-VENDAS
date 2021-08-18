import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/Users';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import auth from '@config/auth';
import { sign } from 'jsonwebtoken';

interface IRequest {
    password: string;
    email: string;
}

interface IResponse {
    token: string;
    user: User;
}
class CreateUserService {
    async execute({ email, password }: IRequest): Promise<IResponse> {
        let user;
        let token;
        try {
            const userRepository = getCustomRepository(UserRepository);

            user = await userRepository.findByEmail(email);
            if (!user) {
                throw new AppError('Email ou senha, invalidos', 401);
            }

            const passwordHash = await compare(password, user.password);
            if (!passwordHash) {
                throw new AppError('Email ou senha, invalidos', 401);
            }

            token = sign({}, auth.jwt.secret, {
                subject: user.id,
                expiresIn: '1d',
            });
        } catch (error) {
            console.log(error.message);
            throw new AppError(error.message, 401);
        }

        return { token, user };
    }
}

export default CreateUserService;
