import { throws } from 'assert';
import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/Users';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.findOne({ where: { name: name } });
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({ where: { email: email } });
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.findOne({ where: { id: id } });
        return user;
    }
}

export default UserRepository;
