import { Uuid } from "@shared/common/domain/value-objects";

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
    findUserById(userId: Uuid): Promise<any>;
}
