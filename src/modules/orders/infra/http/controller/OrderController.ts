import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class OrderController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { orderProducts, customer } = request.body;
        const createOrderService = container.resolve(CreateOrderService);
        const order = await createOrderService.execute({
            customer: customer,
            products: orderProducts,
        });
        return response.json({ order, status: 200 });
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const ShowOrders = container.resolve(ShowOrderService);
        const orders = await ShowOrders.execute();
        return response.json({ orders, status: 200 });
    }
}

export default OrderController;
