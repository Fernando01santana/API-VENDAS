import { Router } from 'express';
import CustomerController from '../controllers/customerController';

const costumerController = new CustomerController();
const routeCostumer = Router();
routeCostumer.post('/create', costumerController.create);

export default routeCostumer;
