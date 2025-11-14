import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/doc/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors();
  const port: number | undefined = configService.get<number | undefined>('api.port');
  const serverUrl: string | undefined = configService.get<string | undefined>('api.server');
  const production: string | undefined = configService.get<string | undefined>('environment');

  const document = setupSwagger(app, serverUrl as string);
  if (production !== 'production') SwaggerModule.setup(`swagger`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })
  );

  await app.listen(port as number);

  const logger: Logger = new Logger();
  logger.log(`Running in ${port}`);
}
bootstrap();
