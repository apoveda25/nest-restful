import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActionEnum } from '../action.enum';

export class CreateScopeDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: ActionEnum })
  @IsEnum(ActionEnum, { each: true })
  action: ActionEnum;

  @ApiProperty()
  @IsString()
  resource: string;

  @ApiProperty()
  @IsString()
  description: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;

  @IsString()
  createdBy: string;

  @IsString()
  updatedBy: string;
}
