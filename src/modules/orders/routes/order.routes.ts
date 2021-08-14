import { Router } from 'express';
import OrderController from '../controller/OrderController';

const crderController = new OrderController();
const routeOrder = Router();
routeOrder.post('/create', crderController.create);

export default routeOrder;
