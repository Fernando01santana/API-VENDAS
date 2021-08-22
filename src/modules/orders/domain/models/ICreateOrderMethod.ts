import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProducts';

export interface ICreateOrderMethod {
    customer: ICustomer;
    products: ICreateOrderProducts[];
}
