import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ActionEnum } from '../../application/action.enum';

export type ScopeDocument = Scope & Document;

@Schema()
export class Scope {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ type: String, enum: ActionEnum })
  action: string;

  @ApiProperty()
  @Prop()
  resource: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop()
  createdAt: string;

  @ApiProperty()
  @Prop()
  updatedAt: string;

  @ApiProperty()
  @Prop()
  createdBy: string;

  @ApiProperty()
  @Prop()
  updatedBy: string;
}

export const ScopeSchema = SchemaFactory.createForClass(Scope);
