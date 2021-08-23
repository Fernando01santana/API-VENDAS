import { IUser } from '@modules/orders/domain/models/IUser';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUserRepositorie } from '@modules/users/domain/repositories/IUserRepositorie';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../entities/Users';

@EntityRepository(User)
class UserRepository implements IUserRepositorie {
    private ormRepository: Repository<User>;
    constructor() {
        this.ormRepository = getRepository(User);
    }
    public async remove(id: string): Promise<IUser | undefined> {
        const user = await this.ormRepository.findOne(id);
        await this.ormRepository.delete(id);
        return user;
    }
    public async findAll(): Promise<IUser[]> {
        return this.ormRepository.find();
    }
    async create(data: ICreateUser): Promise<IUser> {
        const newUser = this.ormRepository.create(data);
        await this.ormRepository.save(newUser);
        return newUser;
    }
    public async save(user: IUser): Promise<IUser> {
        return this.ormRepository.save(user);
    }

    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { name: name },
        });
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email: email },
        });
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { id: id } });
        return user;
    }
}

export default UserRepository;
