import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs';

export const setupSwagger = (app: INestApplication, serverUrl: string): OpenAPIObject => {
    const config = new DocumentBuilder()
        .setTitle('PRO-ALT-SCRP API')
        .setDescription('An API that is part of...',)
        .setVersion('1.0.0')
        .setExternalDoc('API Documentation', '/swagger-spec.json')
        .addBearerAuth()
        .addServer(serverUrl)
        .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('../swagger-spec.json', JSON.stringify(document));
    return document;
};