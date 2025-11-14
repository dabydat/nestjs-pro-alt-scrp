import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/rest/user.controller';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { UserRepositoryImpl } from './infrastructure/persistence/repositories/user.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { DatabaseModule } from 'src/config/database/database.module';
import { UseCases } from './application';
import { UseCaseModule } from '@shared/use-case-bus/use-case-bus.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
    UseCaseModule.register(...UseCases),
  ],
  controllers: [UserController],
  providers: [
    ...UseCases,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    }
  ],
})
export class UserModule { }
