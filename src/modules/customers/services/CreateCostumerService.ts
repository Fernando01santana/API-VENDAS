import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CostumerRepositorie } from '../typeorm/repositories/CostumerRepositorie';

interface IRequest {
    name: string;
    email: string;
}

class CreateCostumerService {
    async execute({ name, email }: IRequest) {
        const costumerRepositie = getCustomRepository(CostumerRepositorie);
        const searchUser = await costumerRepositie.findByEmail(email);
        if (searchUser) {
            throw new AppError('O email informado já está em uso!', 401);
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
