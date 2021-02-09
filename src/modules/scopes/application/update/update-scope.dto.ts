import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActionEnum } from '../action.enum';

export class UpdateScopeDto {
  @ApiProperty()
  @IsString()
  _id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ enum: ActionEnum })
  @IsEnum(ActionEnum, { each: true })
  @IsOptional()
  action?: ActionEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  resource?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  updatedAt: string;

  @IsString()
  updatedBy: string;
}
