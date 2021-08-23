import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCostumerRepositorie from '../infra/typeorm/repositories/fake/FakeCunstomRepository';
import CreateCostumerService from './CreateCostumerService';

let fakeCostumerRepositorie: FakeCostumerRepositorie;
let createCostumerService: CreateCostumerService;

describe('CreateCustomer', () => {
    beforeEach(() => {
        fakeCostumerRepositorie = new FakeCostumerRepositorie();
        createCostumerService = new CreateCostumerService(
            fakeCostumerRepositorie,
        );

        it('should be able to create a new customer', async () => {
            const customer = await createCostumerService.execute({
                name: 'Fernando',
                email: 'fernando.teste@gmail.com',
            });

            expect(customer).toHaveProperty('id');
        });
    });

    it('should be able to create two customers with the same email and name', async () => {
        await createCostumerService.execute({
            name: 'Fernando',
            email: 'fernando.teste@gmail.com',
        });

        expect(
            createCostumerService.execute({
                name: 'Fernando',
                email: 'fernando.teste@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
