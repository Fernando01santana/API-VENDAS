import { Router } from 'express';
import products from '@modules/products/routes/products.routes';
import user from '@modules/users/routes/user.routes';
import forgoutRouter from '@modules/users/routes/password.routes';

const routes = Router();
routes.use('/products', products);
routes.use('/users', user);
routes.use('/forgout', forgoutRouter);
export default routes;
