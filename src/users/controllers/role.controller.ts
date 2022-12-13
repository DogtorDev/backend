import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { ChangeRoleDto } from '../dtos/roles.dto';

import { ResponseEntity } from 'src/common/types/response.entity';

// ANCHOR: Guards
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../guards/roles.guard';

import { Roles } from '../decorators/roles.decorator';
import { RoleEntity } from '../entities/roles.enum';
import { ApiTags } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // ANCHOR: Change user role
  @ApiTags('roles')
  @Post('change')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleEntity.ADMIN)
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async changeUserRole(@Body() dto: ChangeRoleDto): Promise<ResponseEntity> {
    return this.rolesService.changeUserRole(dto.userId, dto.role);
  }

  // ANCHOR: Get available roles enum
  @ApiTags('roles')
  @Get('')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleEntity.ADMIN)
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async getAvailableRoles(): Promise<ResponseEntity> {
    return this.rolesService.getAvailableRoles();
  }
}
