import { BooleanVO, LastName, Name, UtcDate, Uuid } from "@shared/common/domain/value-objects";
import { Email } from "@shared/common/domain/value-objects/email";
import { Password } from "@shared/common/domain/value-objects/password";
import { Username } from "@shared/common/domain/value-objects/username";

export type UserPrimitives = {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    subscriptionPlanId: string | null;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

export class User {
    private constructor(
        public readonly id: Uuid,
        public readonly email: Email,
        public readonly username: Username,
        public readonly firstName: Name,
        public readonly lastName: LastName,
        public readonly isActive: BooleanVO,
        public readonly subscriptionPlanId: Uuid | null,
        public readonly password: Password,
        public readonly createdAt: UtcDate,
        public readonly updatedAt: UtcDate,
    ) { }

    public static create(
        email: Email,
        username: Username,
        firstName: Name,
        lastName: LastName,
        password: Password,
        subscriptionPlanId?: Uuid,
    ): User {
        return new User(
            Uuid.create(),
            email,
            username,
            firstName,
            lastName,
            BooleanVO.create(true),
            subscriptionPlanId || null,
            password,
            UtcDate.now(),
            UtcDate.now(),
        );
    }

    /**
     * Reconstruct user from persistence (hydration)
     */
    public static fromPrimitives(
        id: Uuid,
        email: Email,
        username: Username,
        firstName: Name,
        lastName: LastName,
        isActive: BooleanVO,
        subscriptionPlanId: Uuid | null,
        password: Password,
        createdAt: UtcDate,
        updatedAt: UtcDate,
    ): User {
        return new User(
            id,
            email,
            username,
            firstName,
            lastName,
            isActive,
            subscriptionPlanId,
            password,
            createdAt,
            updatedAt,
        );
    }

    public toPrimitives(): UserPrimitives {
        return {
            id: this.id.getValue,
            email: this.email.getValue,
            username: this.username.getValue,
            firstName: this.firstName.getValue,
            lastName: this.lastName.getValue,
            isActive: this.isActive.getValue,
            subscriptionPlanId: this.subscriptionPlanId?.getValue ?? null,
            password: this.password.getPassword,
            createdAt: this.createdAt.getValue,
            updatedAt: this.updatedAt.getValue,
        };
    }
}