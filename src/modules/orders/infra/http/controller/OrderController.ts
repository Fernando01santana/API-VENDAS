import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { Request, Response } from 'express';

class OrderController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { orderProducts, customer } = request.body;
        const createOrderService = new CreateOrderService();
        const order = await createOrderService.execute({
            costumer_id: customer,
            products: orderProducts,
        });
        return response.json({ order, status: 200 });
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const ShowOrders = new ShowOrderService();
        const orders = await ShowOrders.execute();
        return response.json({ orders, status: 200 });
    }
}

export default OrderController;
