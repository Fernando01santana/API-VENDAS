import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/Users';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import path from 'path';
import uploadConfig from '../../../config/upload';
import fs from 'fs';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UserRepositorie')
        private userRepository: UserRepository,
    ) { }
    async execute({ user_id, fileName }: IUpdateUserAvatar): Promise<User> {
        const user = await this.userRepository.findById(user_id);
        if (!fileName || !user_id) {
            throw new AppError(
                'Nome de arquivo ou id de usuario não enviado!',
                401,
            );
        }
        if (!user) {
            throw new AppError('Nenhum usuario encontrado!', 401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = fileName;
        await this.userRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;
