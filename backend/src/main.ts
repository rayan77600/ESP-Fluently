import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation globale des DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configuration Swagger (documentation API)
  const config = new DocumentBuilder()
    .setTitle('Fluently API')
    .setDescription('Plateforme d\'échange linguistique avec IA')
    .setVersion('1.0')
    .addBearerAuth()   // pour le JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);   // accessible sur http://localhost:3000/api

  await app.listen(3000);
  console.log('Fluently Backend running on http://localhost:3000');
  console.log('Swagger disponible sur http://localhost:3000/api');
}
bootstrap();