import { Router } from 'express';
import products from '../../../modules/products/routes/products.routes';
import user from '../../../modules/users/routes/user.routes';
import forgoutRouter from '../../../modules/users/routes/password.routes';
import routeCostumer from '../../../modules/customers/routes/costumer.routes';
import routeOrder from '../../../modules/orders/routes/order.routes';

const routes = Router();
routes.use('/products', products);
routes.use('/users', user);
routes.use('/forgout', forgoutRouter);
routes.use('/costumer', routeCostumer);
routes.use('/order', routeOrder);
export default routes;
