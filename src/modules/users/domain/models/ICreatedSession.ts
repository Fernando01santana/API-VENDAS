import User from '@modules/users/infra/typeorm/entities/Users';

export interface ICreatedSession {
    token: string;
    user: User;
}
