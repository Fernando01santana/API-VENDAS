import Products from '../entities/Products';
import { EntityRepository, In, Repository } from 'typeorm';

interface IRequest {
    id: string;
}

@EntityRepository(Products)
export class ProductRepositorie extends Repository<Products> {
    public async findByName(name: string): Promise<Products | undefined> {
        try {
            const product = await this.findOne({ where: { name: name } });
            return product;
        } catch (error) {
            console.log(error.message);
        }
    }

    public async findAllIds(products: IRequest[]): Promise<Products[]> {
        const idsProducts = products.map(product => product.id);
        const ExistsProducts = await this.find({
            where: {
                id: In(idsProducts),
            },
        });
        return ExistsProducts;
    }
}
