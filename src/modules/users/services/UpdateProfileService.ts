import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/Users';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { inject, injectable } from 'tsyringe';
import BcryptHashProvider from '../providers/HashProvider/implementation/BcryptHashProvider';

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UserRepositorie')
        private userRepository: UserRepository,
        @inject('BcryptHash')
        private bcryptHash: BcryptHashProvider,
    ) { }
    async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IUpdateProfile): Promise<User> {
        const repositoryUser = getCustomRepository(UserRepository);
        const user = await this.userRepository.findById(user_id);
        if (!user) {
            throw new AppError('Usuario não encontrado', 401);
        }

        const verifyEmail = await this.userRepository.findByEmail(email);
        if (verifyEmail && verifyEmail.id !== user_id) {
            throw new AppError('Email informado já está em uso!', 401);
        }

        if (password && !old_password) {
            throw new AppError('Informa senha e confirmar senha!', 401);
        }

        if (password !== old_password) {
            const checkOldPassword = await this.bcryptHash.compareHash(
                old_password,
                user.password,
            );
            if (!checkOldPassword) {
                throw new AppError('Senha anterior incorreta!', 401);
            }
            user.password = await this.bcryptHash.generateHsh(old_password);
        }

        user.email = email;
        user.name = name;
        await this.userRepository.save(user);
        return user;
    }
}
export default UpdateProfileService;
