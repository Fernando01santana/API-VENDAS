import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UserRepository from '../typeorm/repositories/UsersRepository';

class ListUsersService {
    async execute(): Promise<User[]> {
        const repositoryUser = getCustomRepository(UserRepository);
        const allUsers = await repositoryUser.find();
        if (!allUsers) {
            throw new AppError('Nenhum usuario cadastrado ate o momento!', 401);
        }
        return allUsers;
    }
}
export default ListUsersService;
