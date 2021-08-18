import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/Users';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
}

class ShowProfileService {
    async execute({ user_id }: IRequest): Promise<User> {
        const repositoryUser = getCustomRepository(UserRepository);
        const user = await repositoryUser.findById(user_id);
        if (!user) {
            throw new AppError('Nenhum usuario cadastrado ate o momento!', 401);
        }
        return user;
    }
}
export default ShowProfileService;
