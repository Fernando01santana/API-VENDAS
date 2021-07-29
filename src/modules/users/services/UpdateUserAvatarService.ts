import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UserRepository from '../typeorm/repositories/UsersRepository';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
    fileName: string | undefined;
    user_id: string;
}

class UpdateUserAvatarService {
    async execute({ user_id, fileName }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findById(user_id);
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
        await userRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;
