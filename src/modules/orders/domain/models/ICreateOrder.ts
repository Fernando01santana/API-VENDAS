import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProducts';

export interface ICreateOrder {
    customer: string;
    products: ICreateOrderProducts[];
}
