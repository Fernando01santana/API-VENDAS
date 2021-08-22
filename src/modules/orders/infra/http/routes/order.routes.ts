import { Router } from 'express';
import OrderController from '../controller/OrderController';
const orderController = new OrderController();
const routeOrder = Router();
routeOrder.post('/create', orderController.create);
routeOrder.get('/', orderController.list);

export default routeOrder;
