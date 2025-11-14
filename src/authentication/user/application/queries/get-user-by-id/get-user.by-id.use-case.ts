import { Inject } from "@nestjs/common";
import { USER_REPOSITORY, type UserRepository } from "../../../domain/repositories/user.repository";
import { UseCaseHandler } from "@shared/use-case-bus/decorators/use-case-handler.decorator";
import { GetUserById } from "./get-user-by-id";
import { Uuid } from "@shared/common/domain/value-objects";
import { IUseCaseHandler } from "@shared/use-case-bus/types/use-case.interface";

@UseCaseHandler(GetUserById)
export class GetUserByIdUseCase implements IUseCaseHandler<GetUserById> {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async execute(query: GetUserById) {
        const userId: Uuid = Uuid.create(query.userId);
        const user = await this.userRepository.findUserById(userId);
        return user;
    }
}