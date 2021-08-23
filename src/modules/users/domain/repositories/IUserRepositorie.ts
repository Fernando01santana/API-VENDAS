import { IUser } from '@modules/orders/domain/models/IUser';
import { ICreateUser } from '../models/ICreateUser';

export interface IUserRepositorie {
    findAll(): Promise<IUser[]>;
    findByName(name: string): Promise<IUser | undefined>;
    findById(id: string): Promise<IUser | undefined>;
    findByEmail(email: string): Promise<IUser | undefined>;
    create(data: ICreateUser): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
    remove(id: string): Promise<IUser | undefined>;
}
