import OrderRepository from '../typeorm/repositorie/OrderRepository';
import Order from '../typeorm/entities/Order';
import { getCustomRepository, getRepository } from 'typeorm';
import { CostumerRepositorie } from '@modules/customers/typeorm/repositories/CostumerRepositorie';
import { ProductRepositorie } from '@modules/products/typeorm/repositories/ProductsRepositorie';
import AppError from '@shared/errors/AppError';

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    costumer_id: string;
    products: IProduct[];
}

class CreateOrderService {
    async execute({ costumer_id, products }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrderRepository);
        const customersRepository = getCustomRepository(CostumerRepositorie);
        const productsRepository = getCustomRepository(ProductRepositorie);

        const customerExists = await customersRepository.findOne(costumer_id);

        if (!customerExists) {
            throw new AppError(
                'Could not find any customer with the given id.',
            );
        }

        const existsProducts = await productsRepository.findAllIds(products);
        if (!existsProducts.length) {
            throw new AppError(
                'Could not find any products with the given ids.',
            );
        }

        const existsProductsIds = existsProducts.map(product => product.id);

        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id),
        );

        if (checkInexistentProducts.length) {
            throw new AppError(
                `Could not find product ${checkInexistentProducts[0].id}.`,
            );
        }

        const quantityAvailable = products.filter(
            product =>
                existsProducts.filter(p => p.id === product.id)[0].quantity <
                product.quantity,
        );

        if (quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity}
             is not available for ${quantityAvailable[0].id}.`,
            );
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price,
        }));

        const order = await ordersRepository.createOrder({
            customer_id: customerExists,
            products: serializedProducts,
        });

        for (let i = 0; i < existsProducts.length; i++) {
            if (existsProducts[i].id === products[i].id) {
                existsProducts[i].quantity =
                    existsProducts[i].quantity - products[i].quantity;
                await productsRepository.save(existsProducts[i]);
            }
        }
        await ordersRepository.save(order);
        return order;
    }
}

export default CreateOrderService;
