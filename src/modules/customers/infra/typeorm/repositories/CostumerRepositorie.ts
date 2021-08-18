import Costumer from '../entities/Costumers';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Costumer)
export class CostumerRepositorie extends Repository<Costumer> {
    public async findByName(name: string): Promise<Costumer | undefined> {
        const product = this.findOne({ where: { name: name } });
        return product;
    }

    public async findByEmail(email: string): Promise<Costumer | undefined> {
        const costumer = this.findOne({ where: { email: email } });
        return costumer;
    }
}
