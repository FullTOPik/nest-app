import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { CLIENT_HOST, PORT } from './config/config';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      credentials: true,
      origin: CLIENT_HOST,
    });
    app.use(cookieParser());
    app.use(helmet());
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('Market')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT);
  } catch (error) {
    console.error("Starting application error");
    process.exit(1);
  }
}
bootstrap();

