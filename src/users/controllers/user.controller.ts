import {
  Body,
  Controller,
  Post,
  Param,
  Delete,
  Get,
  HttpCode,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { BanUserDto, OnlyUserIdDto } from '../dtos/user.dto';

// Guards
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { RoleEntity } from '../entities/roles.enum';
import { ResponseEntity } from 'src/common/types/response.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ANCHOR: Ban user
  @ApiTags('users')
  @Post('ban')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleEntity.ADMIN)
  async banUser(@Body() banUserDto: BanUserDto): Promise<ResponseEntity> {
    const response = await this.usersService.banUser(
      banUserDto.userId,
      banUserDto.reason,
    );

    return response;
  }

  // Unban user
  @ApiTags('users')
  @Post('unban')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleEntity.ADMIN)
  async unbanUser(
    @Body() unbanUserDto: OnlyUserIdDto,
  ): Promise<ResponseEntity> {
    const response = await this.usersService.unbanUser(unbanUserDto.userId);

    return response;
  }

  // Get all users
  @ApiTags('users')
  @Get('')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleEntity.ADMIN)
  async getAllUsers(): Promise<ResponseEntity> {
    const response = await this.usersService.getAllUsers();

    return response;
  }

  // Get user by id
  @ApiTags('users')
  @Get(':userId')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleEntity.ADMIN)
  async getUserById(
    @Param() onlyUserIdDto: OnlyUserIdDto,
  ): Promise<ResponseEntity> {
    const response = await this.usersService.findOne(onlyUserIdDto.userId);

    return response;
  }

  // Delete user
  @ApiTags('users')
  @Delete(':userId')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleEntity.ADMIN)
  async deleteUser(
    @Param() onlyUserIdDto: OnlyUserIdDto,
  ): Promise<ResponseEntity> {
    const response = await this.usersService.deleteUser(onlyUserIdDto.userId);

    return response;
  }
}
