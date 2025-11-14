import { Schemas } from "@shared/common/domain/enums/schemas.enum";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthenticationSchema1763149898785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createSchema(
            Schemas.AUTHENTICATION,
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropSchema(
            Schemas.AUTHENTICATION,
            true,
            false
        )
    }

}
