import AppError from '@shared/errors/AppError';
import OrdertRepositorie from '@modules/orders/infra/typeorm/repositorie/OrderRepository';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import { injectable } from 'tsyringe';

@injectable()
class ShowOrderService {
    constructor(private orderRepository: OrdertRepositorie) {}
    async execute(): Promise<Order[]> {
        const orders = await this.orderRepository.find();
        if (!orders) {
            throw new AppError('Nenhuma order encontrada!', 401);
        }
        return orders;
    }
}
export default ShowOrderService;
