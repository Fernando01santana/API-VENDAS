import AppError from '../../../shared/errors/AppError';
import { hash } from 'bcryptjs';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUpdateUser } from '../domain/models/IUpdateUser';
import { inject, injectable } from 'tsyringe';
import { IUser } from '@modules/orders/domain/models/IUser';

@injectable()
class UpdateUserService {
    constructor(
        @inject('UserRepositorie')
        private userRepository: UserRepository,
    ) { }
    async execute({ id, name, email, password }: IUpdateUser): Promise<IUser> {
        const searchUser = await this.userRepository.findById(id);
        if (!searchUser) {
            throw new AppError('Usuario não encontrado!', 401);
        }

        searchUser.email = email;
        searchUser.name = name;
        searchUser.password = await hash(password, 8);

        const userUpdated = await this.userRepository.save(searchUser);
        return userUpdated;
    }
}

export default UpdateUserService;
