import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Products';
import { ProductRepositorie } from '../typeorm/repositories/ProductsRepositorie';

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
    public async execute(): Promise<IPaginateProduct> {
        const productRepository = getCustomRepository(ProductRepositorie);
        const products = productRepository.createQueryBuilder().pagination();
        return products as IPaginateProduct;
    }
}
export default ListProductService;
