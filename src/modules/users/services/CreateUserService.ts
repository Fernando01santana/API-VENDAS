import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { CreateDateColumn, getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    name: string;
    password: string;
    email: string;
}

class CreateUserService {
    async execute({ name, email, password }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        if (name === '' || email === '' || password === '') {
            throw new AppError('Um ou mais parametros nao informados!', 401);
        }
        const hashedPassword = await hash(password, 8);
        const searchUser = await userRepository.findByEmail(email);
        if (searchUser) {
            throw new AppError('Email já em uso', 401);
        }

        const createUser = await userRepository.create({
            email: email,
            name: name,
            password: hashedPassword,
        });

        await userRepository.save(createUser);
        return;
    }
}

export default CreateUserService;
