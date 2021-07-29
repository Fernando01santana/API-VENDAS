import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Products';
import { ProductRepositorie } from '../typeorm/repositories/ProductsRepositorie';

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepositorie);
        const products = await productRepository.find();
        return products;
    }
}
export default ListProductService;
