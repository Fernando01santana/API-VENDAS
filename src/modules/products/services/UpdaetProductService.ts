import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '@modules/products/infra/typeorm/entities/Products';
import { ProductRepositorie } from '@modules/products/infra/typeorm/repositories/ProductsRepositorie';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}
class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepositorie);
        const product = await productRepository.find({ where: { id: id } });
        if (!product[0]) {
            throw new AppError('Produto não informado!', 401);
        }

        product[0].name = name;
        product[0].price = price;
        product[0].quantity = quantity;
        await productRepository.save(product);
        return product[0];
    }
}

export default UpdateProductService;
