import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { USER_ENTITY_NAME } from "../entities/user.entity";
import { Schemas } from "@shared/common/domain/enums/schemas.enum";

export class CreateUsersTable1763149960131 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            schema: Schemas.AUTHENTICATION,
            name: USER_ENTITY_NAME,
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',

                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,

                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,

                },
                {
                    name: 'first_name',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,

                },
                {
                    name: 'last_name',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,

                },
                {
                    name: 'subscription_plan_id',
                    type: 'varchar',
                    isNullable: true,

                },
                {
                    name: 'is_active',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
            indices: [
                { name: 'IDX_USER_EMAIL', columnNames: ['email'], isUnique: true, },
                { name: 'IDX_USER_USERNAME', columnNames: ['username'], isUnique: true, },
            ],
            uniques: [
                { name: 'UQ_USER_EMAIL', columnNames: ['email'], },
                { name: 'UQ_USER_USERNAME', columnNames: ['username'], },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(USER_ENTITY_NAME, true, true, true);
    }

}
