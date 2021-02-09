import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiHeader,
  ApiQuery,
} from '@nestjs/swagger';
import { ScopesService } from '../domain/scopes.service';
import { CreateScopeDto } from '../application/create/create-scope.dto';
import { UpdateScopeDto } from '../application/update/update-scope.dto';
import { Scope } from '../domain/entities/scope.entity';
import { CreateResourcePipe } from '../../../shared/infrastructure/create-resource.pipe';
import { ActionEnum } from '../application/action.enum';
import { SearchScopeDto } from '../application/search/search-scopes.dto';
import { UpdateResourcePipe } from '../../../shared/infrastructure/update-resource.pipe';

@ApiTags('Scopes')
@Controller('scopes')
export class ScopesController {
  constructor(private readonly scopesService: ScopesService) {}

  @ApiCreatedResponse({ type: Scope })
  @ApiHeader({ name: 'x-user-id', required: true })
  @UsePipes(ValidationPipe)
  @UsePipes(CreateResourcePipe)
  @Post()
  async create(@Body() scope: CreateScopeDto) {
    return await this.scopesService.create(scope);
  }

  @ApiOkResponse({ type: Scope })
  @ApiHeader({ name: 'x-user-id', required: true })
  @ApiQuery({ name: 'id', type: 'string', required: false })
  @ApiQuery({ name: 'name', type: 'string', required: false })
  @ApiQuery({ name: 'action', enum: ActionEnum, required: false })
  @ApiQuery({ name: 'resource', type: 'string', required: false })
  @ApiQuery({ name: 'createdBy', type: 'string', required: false })
  @ApiQuery({ name: 'updatedBy', type: 'string', required: false })
  @UsePipes(ValidationPipe)
  @Get()
  async search(@Query() query: SearchScopeDto) {
    return await this.scopesService.search(query);
  }

  @ApiOkResponse({ type: Scope })
  @ApiHeader({ name: 'x-user-id', required: true })
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.scopesService.find(id);
  }

  @ApiCreatedResponse({ type: Scope })
  @ApiHeader({ name: 'x-user-id', required: true })
  @UsePipes(ValidationPipe)
  @UsePipes(UpdateResourcePipe)
  @Put()
  async update(@Body() updateScopeDto: UpdateScopeDto) {
    return await this.scopesService.update(updateScopeDto);
  }

  @ApiCreatedResponse({ type: Scope })
  @ApiHeader({ name: 'x-user-id', required: true })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.scopesService.remove(id);
  }
}
