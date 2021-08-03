import { Router } from 'express';
import products from '../../../modules/products/routes/products.routes';
import user from '../../../modules/users/routes/user.routes';
import forgoutRouter from '../../../modules/users/routes/password.routes';
import routeCostumer from '../../../modules/customers/routes/costumer.routes';

const routes = Router();
routes.use('/products', products);
routes.use('/users', user);
routes.use('/forgout', forgoutRouter);
routes.use('/costumer', routeCostumer);
export default routes;
