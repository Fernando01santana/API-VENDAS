import customers from '@modules/customers/typeorm/entities/Costumers';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IProducts {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer_id: customers;
    products: IProducts[];
}

@EntityRepository(Order)
export class OrdertRepositorie extends Repository<Order> {
    public async findById(id: string): Promise<Order | undefined> {
        const order = this.findOne({
            where: { id },
            relations: ['orderProducts', 'customer'],
        });
        return order;
    }

    public async createOrder({
        customer_id,
        products,
    }: IRequest): Promise<Order> {
        const order = this.create({
            customer: customer_id,
            orderProducts: products,
        });
        await this.save(order);
        return order;
    }
}

export default OrdertRepositorie;
