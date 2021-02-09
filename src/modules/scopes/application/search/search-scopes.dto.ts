import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ActionEnum } from '../action.enum';

export class SearchScopeDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(ActionEnum, { each: true })
  @IsOptional()
  action?: ActionEnum;

  @IsString()
  @IsOptional()
  resource?: string;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsString()
  @IsOptional()
  updatedBy?: string;
}
