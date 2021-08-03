import { Request, Response } from 'express';
import CreateCostumerService from '../services/CreateCostumerService';
class CustomerController {
    async create(request: Request, response: Response): Promise<Response> {
        const createCostumer = new CreateCostumerService();
        const { name, email } = request.body;
        const costumer = await createCostumer.execute({ name, email });
        return response.json({ costumer, status: 200 });
    }

    // async delete(request: Response, response: Response): Promise<Response> {}

    // async list(request: Response, response: Response): Promise<Response> {}

    // async update(request: Response, response: Response): Promise<Response> {}
}

export default CustomerController;
