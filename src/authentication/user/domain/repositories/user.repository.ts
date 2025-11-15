import { Uuid } from "@shared/common/domain/value-objects";
import { User } from "../model/user.model";

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
    findUserById(userId: Uuid): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
}
