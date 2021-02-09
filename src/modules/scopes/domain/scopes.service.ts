import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScopeDto } from '../application/create/create-scope.dto';
import { UpdateScopeDto } from '../application/update/update-scope.dto';
import { Scope, ScopeDocument } from './entities/scope.entity';
import { SearchScopeDto } from '../application/search/search-scopes.dto';

@Injectable()
export class ScopesService {
  constructor(
    @InjectModel(Scope.name) private scopeModel: Model<ScopeDocument>,
  ) {}

  async create(createScopeDto: CreateScopeDto) {
    try {
      const createdScope = await this.scopeModel.create(createScopeDto);

      return await createdScope.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async search(filters: SearchScopeDto) {
    try {
      return await this.scopeModel.find(filters).exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(_id: string) {
    try {
      return await this.scopeModel.findOne({ _id }).exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(updateScopeDto: UpdateScopeDto) {
    try {
      const { _id } = updateScopeDto;

      await this.scopeModel.updateOne({ _id }, updateScopeDto).exec();

      return await this.find(_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(_id: string) {
    try {
      const deletedScope = await this.find(_id);

      await this.scopeModel.remove({ _id }).exec();

      return deletedScope;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
