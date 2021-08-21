import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepositorie } from '@modules/products/infra/typeorm/repositories/ProductsRepositorie';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import { IProduct } from '../domain/models/IProduct';

class DeleteProductService {
    public async execute({ id }: IDeleteProduct): Promise<IProduct> {
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
