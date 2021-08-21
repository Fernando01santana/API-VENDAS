import CreateProductService from '@modules/products/services/CreateProductService';
import { Request, Response } from 'express';
import ListProductService from '@modules/products/services/ListProductService';
import UpdateProductService from '@modules/products/services/UpdaetProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import { container } from 'tsyringe';

class ProductController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;
        const productCreate = container.resolve(CreateProductService);
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
