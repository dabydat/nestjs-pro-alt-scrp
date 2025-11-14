import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommonModule } from './shared/common/common.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';
import { configValidation } from './config/config-validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: configValidation,
    }),
    AuthenticationModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
