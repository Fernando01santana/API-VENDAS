import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdertRepositorie from '../typeorm/repositorie/OrderRepository';

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
