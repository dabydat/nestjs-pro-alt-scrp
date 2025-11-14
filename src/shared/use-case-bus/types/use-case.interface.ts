/**
 * Unique symbol used to track result types in use cases
 * This ensures type safety without runtime overhead
 */
export const RESULT_TYPE_SYMBOL = Symbol('RESULT_TYPE_SYMBOL');

/**
 * Base interface for use cases
 */
export interface IUseCase {
}

/**
 * Base class for use cases with type-safe result inference
 */
export declare class UseCase<TResult> implements IUseCase {
    readonly [RESULT_TYPE_SYMBOL]: TResult;
}

export type UseCaseResult<C extends UseCase<unknown>> = C extends UseCase<infer R> ? R : never;

export type IUseCaseHandler<TInput extends IUseCase = any, TOutput = any> =
    TInput extends UseCase<infer InferredOutput>
    ? {
        /**
         * Executes the use case with inferred output type
         * @param input The input data for the use case
         */
        execute(input: TInput): Promise<InferredOutput>;
    }
    : {
        /**
         * Executes the use case with explicit output type
         * @param input The input data for the use case
         */
        execute(input: TInput): Promise<TOutput>;
    };
