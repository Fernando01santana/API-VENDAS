import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import Customers from '../../../customers/typeorm/entities/Costumers';
import OrderProducts from './OrderProducts';

@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customers)
    @JoinColumn({ name: 'customer_id' })
    customer: Customers;

    @OneToMany(() => OrderProducts, ordersproducts => ordersproducts.order, {
        cascade: true,
    })
    orderProducts: OrderProducts[];

    @Column()
    customer_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;
