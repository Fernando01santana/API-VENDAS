import { Request, Response } from 'express';
import CreateCostumerService from '@modules/customers/services/CreateCostumerService';
class CustomerController {
    async create(request: Request, response: Response): Promise<Response> {
        const createCostumer = new CreateCostumerService();
        const { name, email } = request.body;
        const costumer = await createCostumer.execute({ name, email });
        return response.json({ costumer, status: 200 });
    }
}

export default CustomerController;
