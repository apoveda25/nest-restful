import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ScopesModule } from './modules/scopes/scopes.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Authorization Service')
    .setDescription('The authorization API description')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Roles')
    .addTag('Scopes')
    .build();

  const documents = SwaggerModule.createDocument(app, config, {
    include: [ScopesModule],
  });

  SwaggerModule.setup('api/v1', app, documents);

  await app.listen(configService.get('app.port'));
}
bootstrap();
