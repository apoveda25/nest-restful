import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScopesService } from './domain/scopes.service';
import { ScopesController } from './infrastructure/scopes.controller';
import { Scope, ScopeSchema } from './domain/entities/scope.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Scope.name, schema: ScopeSchema }]),
  ],
  controllers: [ScopesController],
  providers: [ScopesService],
})
export class ScopesModule {}
