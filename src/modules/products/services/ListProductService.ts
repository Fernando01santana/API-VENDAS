import { getCustomRepository } from 'typeorm';
import Product from '@modules/products/infra/typeorm/entities/Products';
import { ProductRepositorie } from '@modules/products/infra/typeorm/repositories/ProductsRepositorie';
import RedisCache from '@shared/cache/RedisCache';

interface IPaginateProduct {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    data: Product[];
}

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepositorie);
        const redisCache = new RedisCache();

        //get products in database redis
        let products = await redisCache.recover<Product[]>(
            'api-vendas-PRODUCT_LIST',
        );

        //if not exists
        if (!products) {
            //get products in database
            products = await productRepository.find();
            await redisCache.save('api-vendas-PRODUCT_LIST', products);
        }

        return products;
    }
}
export default ListProductService;
