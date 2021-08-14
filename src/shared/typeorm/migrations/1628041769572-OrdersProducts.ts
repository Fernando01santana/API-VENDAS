import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class OrdersProducts1628041769572 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'OrderProducts',
                columns: [
                    {
                        name: 'id',
                        isPrimary: true,
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('OrderProducts');
    }
}
