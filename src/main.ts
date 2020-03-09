import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './middleware/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // const options = new DocumentBuilder()
  //   .setTitle('Jimmy API')
  //   .setDescription('모두싸인 과제 API 문서')
  //   .setVersion('1.0')
  //   .addTag('sign')
  //   .build()
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
