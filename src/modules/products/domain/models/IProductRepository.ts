import { ICreateProduct } from './ICreateProduct';
import { IFindProducts } from './IFinfProduct';
import { IProduct } from './IProduct';

export interface IProductRepository {
    findByName(name: string): Promise<IProduct | undefined>;
    create(product: ICreateProduct): Promise<IProduct>;
    findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
}
