import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScopesModule } from './modules/scopes/scopes.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { configApp } from './config/config-app';
import { databaseFactory } from './config/config-database';
import { HeadersMiddleware } from './shared/infrastructure/headers.middleware';
import { ScopesController } from './modules/scopes/infrastructure/scopes.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configApp],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseFactory,
    }),
    ScopesModule,
    RolesModule,
    UsersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeadersMiddleware).forRoutes(ScopesController);
  }
}
