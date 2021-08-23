import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/Users';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IShowProfile } from '../domain/models/IShowProfile';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowProfileService {
    constructor(
        @inject('UserRepositorie')
        private userRepositorie: UserRepository,
    ) { }
    async execute({ user_id }: IShowProfile): Promise<User> {
        const user = await this.userRepositorie.findById(user_id);
        if (!user) {
            throw new AppError('Nenhum usuario cadastrado ate o momento!', 401);
        }
        return user;
    }
}
export default ShowProfileService;
