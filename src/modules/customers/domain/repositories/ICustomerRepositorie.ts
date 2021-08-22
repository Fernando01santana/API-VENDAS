import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

/**
 * aqui estou criando uma interface onde ira informar os metodos do repositorio
 * que irei usar posteriormente
 */

export interface ICustomersRepositorie {
    find(): Promise<ICustomer[] | undefined>;
    findByName(name: string): Promise<ICustomer | undefined>;
    findById(id: string): Promise<ICustomer | undefined>;
    findByEmail(email: string): Promise<ICustomer | undefined>;
    create(data: ICreateCustomer): Promise<ICustomer>;
    save(customer: ICustomer): Promise<ICustomer>;
    remove(customer: ICustomer): Promise<void>;
}
