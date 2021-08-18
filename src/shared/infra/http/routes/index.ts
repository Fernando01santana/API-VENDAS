import { Router } from 'express';
import products from '@modules/products/infra/http/routes/products.routes';
import user from '@modules/users/infra/http/routes/user.routes';
import forgoutRouter from '@modules/users/infra/http/routes/password.routes';
import routeCostumer from '@modules/customers/infra/http/routes/costumer.routes';
import routeOrder from '@modules/orders/infra/http/routes/order.routes';

const routes = Router();
routes.use('/products', products);
routes.use('/users', user);
routes.use('/forgout', forgoutRouter);
routes.use('/costumer', routeCostumer);
routes.use('/order', routeOrder);
export default routes;
