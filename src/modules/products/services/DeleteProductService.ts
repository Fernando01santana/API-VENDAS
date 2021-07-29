import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Products';
import { ProductRepositorie } from '../typeorm/repositories/ProductsRepositorie';

interface IRequest {
    id: string;
}

class DeleteProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepositorie);
        const product = await productRepository.find({ where: { id: id } });
        if (product[0]) {
            await productRepository.delete(product[0]);
        } else {
            throw new AppError('Produto não encontrado!', 401);
        }
        return product[0];
    }
}

export default DeleteProductService;
