import { v4 as uuidv4 } from 'uuid';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepositorie } from '@modules/customers/domain/repositories/ICustomerRepositorie';
import Customer from '@modules/customers/infra/typeorm/entities/Costumers';

class FakeCustomersRepository implements ICustomersRepositorie {
    private customers: Customer[] = [];

    public async create({ name, email }: ICreateCustomer): Promise<Customer> {
        const customer = new Customer();

        customer.id = uuidv4();
        customer.name = name;
        customer.email = email;

        this.customers.push(customer);

        return customer;
    }
    public async find(): Promise<Customer[] | undefined> {
        return undefined;
    }
    public async save(customer: Customer): Promise<Customer> {
        Object.assign(this.customers, customer);

        return customer;
    }

    public async remove(customer: Customer): Promise<void> {
        const customerRemoved = this.customers.map(
            customerRemo => customerRemo.id === customer.id,
        );
        for (let i = 0; i < this.customers.length; i++) {
            const element = this.customers[i];
            if (element.id === this.customers[i].id) this.customers.slice(i, i);
        }
        return;
    }

    public async findAll(): Promise<Customer[] | undefined> {
        return undefined;
    }

    public async findByName(name: string): Promise<Customer | undefined> {
        const customer = this.customers.find(
            customer => customer.name === name,
        );
        return customer;
    }

    public async findById(id: string): Promise<Customer | undefined> {
        const customer = this.customers.find(customer => customer.id === id);
        return customer;
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        const customer = this.customers.find(
            customer => customer.email === email,
        );
        return customer;
    }
}

export default FakeCustomersRepository;
