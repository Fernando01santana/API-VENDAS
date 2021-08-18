import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CostumerRepositorie } from '@modules/customers/infra/typeorm/repositories/CostumerRepositorie';
import Customers from '@modules/customers/infra/typeorm/entities/Costumers';

interface IRequest {
    name: string;
    email: string;
}

class CreateCostumerService {
    async execute({ name, email }: IRequest): Promise<Customers> {
        const costumerRepositie = getCustomRepository(CostumerRepositorie);
        const searchUser = await costumerRepositie.findByEmail(email);
        if (searchUser) {
            throw new AppError('O email informado já está em uso!', 401);
        }

        if (!name || !email) {
            throw new AppError(
                'Informe email e nome do cliente que deseja cadastrar',
                401,
            );
        }
        const newCostumer = costumerRepositie.create({
            name,
            email,
        });

        const saveCostumer = await costumerRepositie.save(newCostumer);
        return saveCostumer;
    }
}

export default CreateCostumerService;
