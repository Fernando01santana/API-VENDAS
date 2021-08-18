import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class AddIdToOrderProduct1628116620456 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'OrderProducts',
            new TableColumn({
                name: 'product_id',
                isNullable: true,
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'OrderProducts',
            new TableForeignKey({
                name: 'OrdersProductProducts', // nome da chave
                columnNames: ['product_id'], //nome da coluna que se realaciona com o id da tabela costumers
                referencedTableName: 'product', //nome da tabela
                referencedColumnNames: ['id'], //nome do campo na outra tabela
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('product_id', 'OrdersProductProducts');
        await queryRunner.dropColumn('OrderProducts', 'product_id');
    }
}
