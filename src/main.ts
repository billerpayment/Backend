import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomExceptionFilter } from './CustomExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );
  app.useGlobalFilters(new CustomExceptionFilter());
  app.setGlobalPrefix('api/v1');
  const environment = process.env.NODE_ENV || '';
  if (environment == 'development') {
    const config = new DocumentBuilder()
      .setTitle('Bilify Server')
      .setDescription('Bilify Server')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);
  }
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
