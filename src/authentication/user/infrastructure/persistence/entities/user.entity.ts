import { AUTHENTICATION_SCHEMA } from "@shared/common/domain/constants/schema.constant";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export const USER_ENTITY_NAME = 'users'

@Entity({ schema: AUTHENTICATION_SCHEMA, name: USER_ENTITY_NAME })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    public id: string;

    @Column({ name: 'email', type: 'varchar', length: 50, nullable: false })
    public email: string;

    @Column({ name: 'username', type: 'varchar', length: 50, nullable: false })
    public username: string;

    @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
    public password: string;

    @Column({ name: 'first_name', type: 'varchar', length: 100, nullable: false })
    public firstName: string;

    @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: false })
    public lastName: string;

    @Column({ name: 'subscription_plan_id', type: 'varchar', nullable: true })
    public subscriptionPlanId: string;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    public isActive: boolean;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    constructor(entity: Partial<UserEntity>) {
        Object.assign(this, entity);
    }
}