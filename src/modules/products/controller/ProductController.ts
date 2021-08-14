import CreateProductService from '../services/CreateProductService';
import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import UpdateProductService from '../services/UpdaetProductService';
import DeleteProductService from '../services/DeleteProductService';

class ProductController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;
        const productCreate = new CreateProductService();
        const product = await productCreate.execute({ name, price, quantity });
        return response.json({ product, status: 200 });
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const productList = new ListProductService();
        const product = await productList.execute();
        return response.json({ product, status: 200 });
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, price, quantity } = request.body;
        const productUpdate = new UpdateProductService();
        const product = await productUpdate.execute({
            id,
            name,
            price,
            quantity,
        });
        return response.json({ product, status: 200 });
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const productDelete = new DeleteProductService();
        const product = await productDelete.execute({ id });
        return response.json({ product, status: 200 });
    }
}

export default ProductController;
