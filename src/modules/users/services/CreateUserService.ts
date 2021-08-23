import AppError from '../../../shared/errors/AppError';
import BcryptHashProvider from '../providers/HashProvider/implementation/BcryptHashProvider';
import { ICreateUser } from '../domain/models/ICreateUser';
import { inject, injectable } from 'tsyringe';
import { IUserRepositorie } from '../domain/repositories/IUserRepositorie';

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepositorie')
        private userRepository: IUserRepositorie,
    ) { }
    async execute({ name, email, password }: ICreateUser): Promise<void> {
        if (name === '' || email === '' || password === '') {
            throw new AppError('Um ou mais parametros nao informados!', 401);
        }
        const bcryptHashedProvider = new BcryptHashProvider();
        const hashedPassword = await bcryptHashedProvider.generateHsh(password);
        const searchUser = await this.userRepository.findByEmail(email);
        if (searchUser) {
            throw new AppError('Email já em uso', 401);
        }

        await this.userRepository.create({
            email: email,
            name: name,
            password: hashedPassword,
        });
        return;
    }
}

export default CreateUserService;
