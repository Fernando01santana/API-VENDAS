import { EntityRepository, getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import { IOrderRepositorie } from '@modules/orders/domain/repositories/IOrderRepositorie';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { ICreateOrderMethod } from '@modules/orders/domain/models/ICreateOrderMethod';

@EntityRepository(Order)
export class OrdertRepositorie implements IOrderRepositorie {
    private ormRepository: Repository<Order>;
    constructor() {
        this.ormRepository = getRepository(Order);
    }
    public async findById(id: string): Promise<Order | undefined> {
        const order = this.ormRepository.findOne({
            where: { id },
            relations: ['orderProducts', 'customer'],
        });
        return order;
    }

    public async find(): Promise<Order[] | undefined> {
        const order = this.ormRepository.find();
        return order;
    }

    public async create({
        customer,
        products,
    }: ICreateOrderMethod): Promise<Order> {
        const order = this.ormRepository.create({
            customer,
            orderProducts: products,
        });
        await this.ormRepository.save(order);
        return order;
    }
}

export default OrdertRepositorie;
