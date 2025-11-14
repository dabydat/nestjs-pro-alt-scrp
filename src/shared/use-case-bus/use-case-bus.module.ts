import { DynamicModule, Module, Type } from '@nestjs/common';
import { UseCaseCoreModule } from './use-case-core.module';

@Module({})
export class UseCaseModule {
    public static register<T extends Type<any>>(...handlers: T[]): DynamicModule {
        return {
            module: UseCaseModule,
            imports: [UseCaseCoreModule.register(...handlers)],
        };
    }
}
