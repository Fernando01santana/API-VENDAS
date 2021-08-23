import { container } from 'tsyringe';
import { ICustomersRepositorie } from '@modules/customers/domain/repositories/ICustomerRepositorie';
import { CostumerRepositorie } from '@modules/customers/infra/typeorm/repositories/CostumerRepositorie';
import { IOrderRepositorie } from '@modules/orders/domain/repositories/IOrderRepositorie';
import OrdertRepositorie from '@modules/orders/infra/typeorm/repositorie/OrderRepository';
import { IProductRepository } from '@modules/products/domain/models/repositorie/IProductRepository';
import { ProductRepositorie } from '@modules/products/infra/typeorm/repositories/ProductsRepositorie';
import { IUserRepositorie } from '@modules/users/domain/repositories/IUserRepositorie';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementation/BcryptHashProvider';

container.registerSingleton<ICustomersRepositorie>(
    'CostumerRepositorie',
    CostumerRepositorie,
);

container.registerSingleton<IOrderRepositorie>(
    'OrdersRepository',
    OrdertRepositorie,
);

container.registerSingleton<IProductRepository>(
    'ProductRepository',
    ProductRepositorie,
);

container.registerSingleton<IUserRepositorie>(
    'UserRepositorie',
    UserRepository,
);

container.registerSingleton<BcryptHashProvider>(
    'BcryptHash',
    BcryptHashProvider,
);
