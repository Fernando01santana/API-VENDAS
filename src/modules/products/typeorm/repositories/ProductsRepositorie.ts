import Product from '../entities/Products';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductRepositorie extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        const product = this.findOne({ where: { name: name } });
        return product;
    }
}
