import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepositorie } from '../domain/repositories/ICustomerRepositorie';

@injectable()
class ListCustomerService {
    constructor(
        @inject('CostumerRepositorie')
        private customerRepository: ICustomersRepositorie,
    ) {}
    public async execute(): Promise<ICustomer[] | undefined> {
        const customers = await this.customerRepository.find();
        return customers;
    }
}

export default ListCustomerService;
