import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { IUseCase } from './types/use-case.interface';
import { getUseCaseFromHandler } from './decorators/use-case-handler.decorator';

/**
 * Use Case Bus - Intermediary that executes use cases without exposing handlers
 * Provides security by preventing direct access to handler logic
 */
@Injectable()
export class UseCaseBus {
    private handlers = new Map<Type<IUseCase>, Type<any>>();

    constructor(private readonly moduleRef: ModuleRef) { }

    /**
     * Registers a handler for a use case
     * @param useCase - The use case class
     * @param handler - The handler class
     */
    register(useCase: Type<IUseCase>, handler: Type<any>): void {
        this.handlers.set(useCase, handler);
    }

    /**
     * Executes a use case through the bus
     * @param useCase - The use case instance to execute
     * @returns The result of the use case execution
     * @throws Error if no handler is registered for the use case
     */
    async execute<TResult = any>(useCase: IUseCase): Promise<TResult> {
        const useCaseType = useCase.constructor as Type<IUseCase>;
        const handlerType = this.handlers.get(useCaseType);

        if (!handlerType) {
            throw new Error(
                `No use case handler registered for: ${useCaseType.name}. ` +
                `Make sure the handler is decorated with @UseCaseHandler(${useCaseType.name}) ` +
                `and registered in the module providers.`
            );
        }

        try {
            const handler = this.moduleRef.get(handlerType, { strict: false });
            return await handler.execute(useCase);
        } catch (error) {
            throw new Error(
                `Failed to execute use case ${useCaseType.name}: ${error.message}`
            );
        }
    }

    /**
     * Auto-register all handlers provided in the module
     * Call this in the module constructor or OnModuleInit
     */
    autoRegisterHandlers(providers: Type<any>[]): void {
        providers.forEach((handler) => {
            const useCase = getUseCaseFromHandler(handler);
            if (useCase) {
                this.register(useCase, handler);
                // Optional: uncomment for debugging
                // console.log(`[UseCaseBus] Registered handler: ${handler.name} -> ${useCase.name}`);
            }
        });
    }

    /**
     * Get all registered use case handlers
     * Useful for debugging and testing
     */
    getRegisteredHandlers(): Map<Type<IUseCase>, Type<any>> {
        return new Map(this.handlers);
    }
}
