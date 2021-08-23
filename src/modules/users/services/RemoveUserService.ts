import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserRepositorie } from '../domain/repositories/IUserRepositorie';
import { IRemove } from '../domain/models/IRemove';
import { IUser } from '@modules/orders/domain/models/IUser';

@injectable()
class RemoveUserService {
    constructor(
        @inject('UserRepositorie')
        private userRepository: IUserRepositorie,
    ) { }
    async execute({ id }: IRemove): Promise<IUser> {
        const searchUser = await this.userRepository.findById(id);
        if (!searchUser) {
            throw new AppError('Usuario não encontrado!', 401);
        }

        await this.userRepository.remove(searchUser.id);
        return searchUser;
    }
}

export default RemoveUserService;
