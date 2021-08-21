import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICtusomersRepositorie } from '../domain/repositories/ICustomerRepositorie';

/**
 * removendo dependencia do typeORM e usando
 * a interface de repositorio para acessar os metodos de manipulação do banco
 * na linha 13 criei um construtor com um metodo privado onde recebe o
 * repositorio do customer.
 * apartir desse metodos consigo manipular o banco sem usar o ORM em si
 */

//informa que a classe é injetavel
@injectable()
class CreateCostumerService {
    constructor(
        //passa oque será injetado dentro da classe = chave presente la no container
        @inject('CostumerRepositorie')
        private customersRepository: ICtusomersRepositorie,
    ) {}

    async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
        const searchUser = await this.customersRepository.findByEmail(email);

        if (searchUser) {
            throw new AppError('O email informado já está em uso!', 401);
        }

        if (!name || !email) {
            throw new AppError(
                'Informe email e nome do cliente que deseja cadastrar',
                401,
            );
        }
        const newCostumer = await this.customersRepository.create({
            name,
            email,
        });
        return newCostumer;
    }
}

export default CreateCostumerService;
