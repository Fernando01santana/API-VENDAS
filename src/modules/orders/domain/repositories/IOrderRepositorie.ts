import { IOrder } from '../models/IOrder';
import { ICreateOrder } from '../models/ICreateOrder';

export interface IOrderRepositorie {
    findById(id: string): Promise<IOrder | undefined>;
    create(data: ICreateOrder): Promise<IOrder>;
    find(): Promise<IOrder[] | undefined>;
}
