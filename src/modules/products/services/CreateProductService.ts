import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Products';
import { ProductRepositorie } from '../typeorm/repositories/ProductsRepositorie';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepositorie);
        const searchProduct = await productRepository.findByName(name);
        if (searchProduct) {
            throw new AppError(
                'Produto com o nome informado já cadastrado!',
                400,
            );
        }
        const createProduct = productRepository.create({
            name,
            price,
            quantity,
        });
        await productRepository.save(createProduct);
        return createProduct;
    }
}
export default CreateProductService;
