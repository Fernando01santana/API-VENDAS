import { ICustomer } from './ICustomer';

export interface IPaginationCustomers {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    data: ICustomer[];
}
