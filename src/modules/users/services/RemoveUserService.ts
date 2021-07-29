import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
}

class RemoveUserService {
    async execute({ id }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const searchUser = await userRepository.findOne({ where: { id: id } });
        if (!searchUser) {
            throw new AppError('Usuario não encontrado!', 401);
        }

        await userRepository.delete(searchUser);
        return searchUser;
    }
}

export default RemoveUserService;
