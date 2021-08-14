import {
    Column,
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class AddColunsToOrderProduct1628042226932
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'OrderProducts',
            new TableColumn({
                name: 'order_id',
                isNullable: true,
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'OrderProducts',
            new TableForeignKey({
                name: 'OrdersProductsOrders', // nome da chave
                columnNames: ['order_id'], //nome da coluna que se realaciona com o id da tabela costumers
                referencedTableName: 'orders', //nome da tabela
                referencedColumnNames: ['id'], //nome do campo na outra tabela
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('order_id', 'OrdersProductsOrders');
        await queryRunner.dropColumn('OrderProducts', 'order_id');
    }
}
