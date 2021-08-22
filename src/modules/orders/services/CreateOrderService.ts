import AppError from '@shared/errors/AppError';
import { IOrderRepositorie } from '../domain/repositories/IOrderRepositorie';
import { ICtusomersRepositorie } from '@modules/customers/domain/repositories/ICustomerRepositorie';
import { IOrder } from '../domain/models/IOrder';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@modules/products/domain/models/repositorie/IProductRepository';
import { ICreateOrder } from '../domain/models/ICreateOrder';

@injectable()
class CreateOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrderRepositorie,

        @inject('CostumerRepositorie')
        private customersRepository: ICtusomersRepositorie,

        @inject('ProductRepository')
        private productsRepository: IProductRepository,
    ) {}

    async execute({ customer, products }: ICreateOrder): Promise<IOrder> {
        console.log(customer);
        const customerExists = await this.customersRepository.findById(
            customer,
        );

        if (!customerExists) {
            throw new AppError(
                'Could not find any customer with the given id.',
            );
        }
        const existsProducts = await this.productsRepository.findAllByIds(
            products,
        );
        if (!existsProducts[0]) {
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
            id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price,
        }));

        const order = await this.ordersRepository.create({
            customer: customerExists,
            products: serializedProducts,
        });

        for (let i = 0; i < existsProducts.length; i++) {
            if (
                existsProducts[i].id === products[i].id &&
                existsProducts[i] !== undefined
            ) {
                existsProducts[i].quantity =
                    existsProducts[i].quantity - products[i].quantity;
                await this.productsRepository.create(existsProducts[i]);
            }
        }
        return order;
    }
}

export default CreateOrderService;
