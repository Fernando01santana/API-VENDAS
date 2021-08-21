/***
 * Removendo importação de repositório do TypeORM
 * Aqui criei um atributo privado do tipo repository setando como entidade a entidade costumer
 * depois disso crio um construtor onde o mesmo recebe o metodos do typeorm porem através da entidade de costumer
 */
import Costumer from '../entities/Costumers';
import { Repository, getRepository } from 'typeorm';
import { ICtusomersRepositorie } from '@modules/customers/domain/repositories/ICustomerRepositorie';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

export class CostumerRepositorie implements ICtusomersRepositorie {
    private ormRepository: Repository<Costumer>;
    constructor() {
        this.ormRepository = getRepository(Costumer);
    }
    create(data: ICreateCustomer): Promise<ICustomer> {
        throw new Error('Method not implemented.');
    }

    public async save(customer: Costumer): Promise<Costumer> {
        await this.ormRepository.save(customer);

        return customer;
    }

    public async remove(customer: Costumer): Promise<void> {
        await this.ormRepository.remove(customer);
    }

    public async findAll(): Promise<Costumer[] | undefined> {
        const customers = await this.ormRepository.find();

        return customers;
    }

    public async findByName(name: string): Promise<Costumer | undefined> {
        const customer = await this.ormRepository.findOne({
            where: {
                name,
            },
        });

        return customer;
    }

    public async findById(id: string): Promise<Costumer | undefined> {
        const customer = await this.ormRepository.findOne({
            where: {
                id,
            },
        });

        return customer;
    }

    public async findByEmail(email: string): Promise<Costumer | undefined> {
        const customer = await this.ormRepository.findOne({
            where: {
                email,
            },
        });

        return customer;
    }
}
