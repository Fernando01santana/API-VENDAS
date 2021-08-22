import { Request, Response } from 'express';
import CreateCostumerService from '@modules/customers/services/CreateCostumerService';
import { container } from 'tsyringe';
import ListCustomerService from '@modules/customers/services/ListCustomerService';

/**
 * data as anterações no serviço de criação de cliente
 * para usar o serviço de criação de cliente é necessario informar a interface
 * do repositrio, oberve na linha 13
 */
class CustomerController {
    async create(request: Request, response: Response): Promise<Response> {
        //usa o metodo resolve do container para injetar o metoco como dependencia
        const createCostumer = container.resolve(CreateCostumerService);
        const { name, email } = request.body;
        const costumer = await createCostumer.execute({ name, email });
        return response.json({ costumer, status: 200 });
    }

    async list(request: Request, response: Response): Promise<Response> {
        //usa o metodo resolve do container para injetar o metoco como dependencia
        const createCostumer = container.resolve(ListCustomerService);
        const costumer = await createCostumer.execute();
        return response.json({ costumer, status: 200 });
    }
}

export default CustomerController;
