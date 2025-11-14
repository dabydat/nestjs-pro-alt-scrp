import { Injectable, InjectableOptions, Type } from '@nestjs/common';
import { IUseCase } from '../types/use-case.interface';

export const USE_CASE_HANDLER_METADATA = 'USE_CASE_HANDLER_METADATA';

/**
 * Decorator that marks a class as a Use Case Handler.
 * Associates a use case with its handler implementation.
 *
 * @param useCase - The use case class that this handler processes
 * @param options - Injectable options passed to the "@Injectable" decorator
 * @throws TypeError if useCase is not provided or not a valid class
 */
export function UseCaseHandler(
    useCase: Type<IUseCase>,
    options?: InjectableOptions
): ClassDecorator {
    if (!useCase) {
        throw new TypeError('UseCaseHandler decorator requires a use case class');
    }

    return (target: Function) => {
        // Store metadata for auto-registration
        Reflect.defineMetadata(USE_CASE_HANDLER_METADATA, useCase, target);

        // Apply @Injectable decorator
        Injectable(options)(target as Type<any>);
    };
}

/**
 * Get the use case type from handler metadata
 */
export function getUseCaseFromHandler(handler: Type<any>): Type<IUseCase> | undefined {
    return Reflect.getMetadata(USE_CASE_HANDLER_METADATA, handler);
}