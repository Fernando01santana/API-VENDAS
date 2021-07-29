import { Router } from 'express';
import ProductController from '../controller/ProductController';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', productController.list);
productRouter.get('/:id', productController.update);
productRouter.delete('/:id', productController.remove);
productRouter.post('/', productController.create);

export default productRouter;
