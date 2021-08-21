import { container } from 'tsyringe';
import { ICtusomersRepositorie } from '@modules/customers/domain/repositories/ICustomerRepositorie';
import { CostumerRepositorie } from '@modules/customers/infra/typeorm/repositories/CostumerRepositorie';
import { IOrderRepositorie } from '@modules/orders/domain/repositories/IOrderRepositorie';
import OrdertRepositorie from '@modules/orders/infra/typeorm/repositorie/OrderRepository';
import { IProductRepository } from '@modules/products/domain/models/IProductRepository';
import { ProductRepositorie } from '@modules/products/infra/typeorm/repositories/ProductsRepositorie';

container.registerSingleton<ICtusomersRepositorie>(
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
