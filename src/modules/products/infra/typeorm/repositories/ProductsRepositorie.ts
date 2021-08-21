import Products from '../entities/Products';
import { EntityRepository, getRepository, In, Repository } from 'typeorm';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProductRepository } from '@modules/products/domain/models/IProductRepository';
import { IFindProducts } from '@modules/products/domain/models/IFinfProduct';

@EntityRepository(Products)
export class ProductRepositorie implements IProductRepository {
    private ormRepository: Repository<Products>;
    constructor() {
        this.ormRepository = getRepository(Products);
    }

    public async findByName(name: string): Promise<Products | undefined> {
        try {
            const product = await this.ormRepository.findOne({
                where: { name: name },
            });
            return product;
        } catch (error) {
            console.log(error.message);
        }
    }

    public async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
        const idsProducts = products.map(product => product.id);
        const ExistsProducts = await this.ormRepository.find({
            where: {
                id: In(idsProducts),
            },
        });
        return ExistsProducts;
    }

    public async create(product: ICreateProduct): Promise<IProduct> {
        const newProduct = await this.ormRepository.save(product);
        return newProduct;
    }
}
