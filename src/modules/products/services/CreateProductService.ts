import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '@modules/products/infra/typeorm/entities/Products';
import { ProductRepositorie } from '@modules/products/infra/typeorm/repositories/ProductsRepositorie';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepositorie);
        const productExists = await productsRepository.findByName(name);
        const redisCache = new RedisCache();

        await redisCache.invalidade('api-vendas-PRODUCT_LIST');

        if (productExists) {
            throw new AppError('There is already one product with this name');
        }

        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        await productsRepository.save(product);

        return product;
    }
}
export default CreateProductService;
