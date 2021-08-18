import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import OrdertRepositorie from '@modules/orders/infra/typeorm/repositorie/OrderRepository';
import Order from '@modules/orders/infra/typeorm/entities/Order';

class ShowOrderService {
    async execute(): Promise<Order[]> {
        const orderRepository = getCustomRepository(OrdertRepositorie);
        const orders = await orderRepository.find();
        if (!orders[0]) {
            throw new AppError('Nenhuma order encontrada!', 401);
        }
        return orders;
    }
}
export default ShowOrderService;
