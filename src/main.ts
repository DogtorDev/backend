import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as yaml from 'yaml';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Main Function
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Dogtor API')
    .setDescription('Documentation for Dogtor API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  const yamlString = yaml.stringify(document);
  fs.writeFileSync('./swagger-spec.yaml', yamlString);
  SwaggerModule.setup('api', app, document);

  // Cors
  app.enableCors();

  // Start Server
  await app.listen(3000);
}

bootstrap();
