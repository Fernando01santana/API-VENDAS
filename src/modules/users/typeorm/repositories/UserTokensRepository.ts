import AppError from '@shared/errors/AppError';
import { throws } from 'assert';
import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken> {
    public async findByToken(token: string): Promise<UserToken> {
        const userToken = await this.findOne({ where: { token: token } });
        if (!userToken) {
            throw new AppError('Token não encontrado', 401);
        }
        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = await this.create({ user_id: user_id });
        await this.save(userToken);
        return userToken;
    }
}

export default UserTokensRepository;
