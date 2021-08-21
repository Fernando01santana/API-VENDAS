import AppError from '../../../shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { IProduct } from '../domain/models/IProduct';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProductRepository } from '../domain/models/repositorie/IProductRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateProductService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
    ) {}
    public async execute({
        name,
        price,
        quantity,
    }: ICreateProduct): Promise<IProduct> {
        const productExists = await this.productRepository.findByName(name);
        const redisCache = new RedisCache();

        await redisCache.invalidade('api-vendas-PRODUCT_LIST');

        if (productExists) {
            throw new AppError('There is already one product with this name');
        }

        const product = this.productRepository.create({
            name,
            price,
            quantity,
        });

        return product;
    }
}
export default CreateProductService;
