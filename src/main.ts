import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === "development") {
    app.enableCors();
  } else {
    app.enableCors({ origin: "*" })
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Task Manager Document")
    .setDescription("This is a nestjs demo")
    .setVersion("0.1")
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api-docs", app, swaggerDocument);

  await app.listen(3000);
}

bootstrap();
