import AppError from '../../../shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password: string;
}

class UpdateProfileService {
    async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IRequest): Promise<User> {
        const repositoryUser = getCustomRepository(UserRepository);
        const user = await repositoryUser.findById(user_id);
        if (!user) {
            throw new AppError('Usuario não encontrado', 401);
        }

        const verifyEmail = await repositoryUser.findByEmail(email);
        if (verifyEmail && verifyEmail.id !== user_id) {
            throw new AppError('Email informado já está em uso!', 401);
        }

        if (password && !old_password) {
            throw new AppError('Informa senha e confirmar senha!', 401);
        }

        if (password !== old_password) {
            const checkOldPassword = await compare(old_password, user.password);
            if (!checkOldPassword) {
                throw new AppError('Senha anterior incorreta!', 401);
            }
            user.password = await hash(old_password, 8);
        }

        user.email = email;
        user.name = name;
        await repositoryUser.save(user);
        return user;
    }
}
export default UpdateProfileService;
