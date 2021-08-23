import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserRepositorie } from '../domain/repositories/IUserRepositorie';
import { IUser } from '@modules/orders/domain/models/IUser';

@injectable()
class ListUsersService {
    constructor(
        @inject('UserRepositorie')
        private userRepository: IUserRepositorie,
    ) { }
    async execute(): Promise<IUser[]> {
        const allUsers = await this.userRepository.findAll();
        console.log(allUsers);
        if (!allUsers) {
            throw new AppError('Nenhum usuario cadastrado ate o momento!', 401);
        }
        return allUsers;
    }
}
export default ListUsersService;
