import customers from '@modules/customers/infra/typeorm/entities/Costumers';
import OrderProducts from '@modules/orders/infra/typeorm/entities/OrderProducts';

export interface IOrder {
    customer: customers;
    orderProducts: OrderProducts[];
    created_at: Date;
    updated_at: Date;
}
