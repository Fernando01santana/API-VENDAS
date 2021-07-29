import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
}

class UpdateUserService {
    async execute({ id, name, email, password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const searchUser = await userRepository.findOne({ where: { id: id } });
        if (!searchUser) {
            throw new AppError('Usuario não encontrado!', 401);
        }

        searchUser.email = email;
        searchUser.name = name;
        searchUser.password = await hash(password, 8);

        const userUpdated = await userRepository.save(searchUser);
        return userUpdated;
    }
}

export default UpdateUserService;
