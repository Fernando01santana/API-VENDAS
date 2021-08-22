import { IOrder } from '../models/IOrder';
import { ICreateOrderMethod } from '../models/ICreateOrderMethod';

export interface IOrderRepositorie {
    findById(id: string): Promise<IOrder | undefined>;
    create(data: ICreateOrderMethod): Promise<IOrder>;
    find(): Promise<IOrder[] | undefined>;
}
