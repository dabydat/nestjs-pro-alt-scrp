import { BooleanVO, Email, LastName, Name, Password, UtcDate, Uuid } from '@shared/common/domain/value-objects';
import { UserEntity } from '../persistence/entities/user.entity';
import { Username } from '@shared/common/domain/value-objects/username';
import { User, UserPrimitives } from '../../domain/model/user.model';

export class UserMapper {
    static toDomain(entity: UserEntity): User {
        return User.fromPrimitives(
            Uuid.create(entity.id),
            Email.create(entity.email),
            Username.create(entity.username),
            Name.create(entity.firstName),
            LastName.create(entity.lastName),
            BooleanVO.create(entity.isActive),
            entity.subscriptionPlanId ? Uuid.create(entity.subscriptionPlanId) : null,
            Password.createHashed(entity.password),
            UtcDate.create(entity.createdAt),
            UtcDate.create(entity.updatedAt),
        );
    }

    static toPersistence(model: User): UserEntity {
        const primitives = model.toPrimitives();
        return new UserEntity({
            id: primitives.id,
            email: primitives.email,
            username: primitives.username,
            password: primitives.password,
            firstName: primitives.firstName,
            lastName: primitives.lastName,
            subscriptionPlanId: primitives.subscriptionPlanId ?? undefined,
            isActive: primitives.isActive,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
        });
    }

    static toResponse(model: User) {
        const primitives: UserPrimitives = model.toPrimitives();
        return {
            id: primitives.id,
            email: primitives.email,
            username: primitives.username,
            first_name: primitives.firstName,
            last_name: primitives.lastName,
            is_active: primitives.isActive,
            created_at: primitives.createdAt,
            updated_at: primitives.updatedAt,
        };
    }
}
