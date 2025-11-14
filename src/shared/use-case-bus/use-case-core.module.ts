import { DynamicModule, Global, Module, Type, OnModuleInit, Inject, Optional } from '@nestjs/common';
import { UseCaseBus } from './use-case.bus';
import { USE_CASE_HANDLERS_TOKEN } from './constants/use-case.constant';

@Global()
@Module({})
export class UseCaseCoreModule implements OnModuleInit {
    constructor(
        private readonly useCaseBus: UseCaseBus,
        @Optional() @Inject(USE_CASE_HANDLERS_TOKEN) private readonly handlers?: Type<any>[]
    ) { }

    /**
     * Registers use case handlers dynamically
     * @param handlers - Array of handler classes decorated with @UseCaseHandler
     * @returns DynamicModule configuration
     */
    public static register(...handlers: Type<any>[]): DynamicModule {
        return {
            module: UseCaseCoreModule,
            providers: [
                UseCaseBus,
                {
                    provide: USE_CASE_HANDLERS_TOKEN,
                    useValue: handlers,
                },
            ],
            exports: [UseCaseBus],
        };
    }

    onModuleInit() {
        // Auto-register handlers on module initialization
        if (this.handlers && this.handlers.length > 0) {
            this.useCaseBus.autoRegisterHandlers(this.handlers);
        }
    }
}
