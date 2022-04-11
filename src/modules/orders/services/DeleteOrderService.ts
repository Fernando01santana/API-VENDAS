import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import OrdertRepositorie from '../typeorm/repositorie/OrderRepository';

export default class DeleteOrderService {
    async execute(id: string): Promise<boolean> {
        const orderRepository = getCustomRepository(OrdertRepositorie);
        const order = await orderRepository.findById(id);

        if (!order) {
            throw new AppError('Nenhuma order encontrada!');
        }

        orderRepository.delete(order.id);
        return true;
    }
}
