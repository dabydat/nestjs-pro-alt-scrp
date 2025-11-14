import { IUseCase } from "@shared/use-case-bus/types/use-case.interface";

export class GetUserById implements IUseCase {
    constructor(public readonly userId: string) { }
}