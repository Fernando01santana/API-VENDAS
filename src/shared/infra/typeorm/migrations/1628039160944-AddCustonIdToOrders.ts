import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class AddCustonIdToOrders1628039160944 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'customer_id',
                isNullable: true,
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'OrdersCustomer', // nome da chave
                columnNames: ['customer_id'], //nome da coluna que se realaciona com o id da tabela costumers
                referencedTableName: 'customers', //nome da tabela
                referencedColumnNames: ['id'], //nome do campo na outra tabela
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
        await queryRunner.dropColumn('orders', 'customer_id');
    }
}
