import {
  Body,
  Query,
  Controller,
  Post,
  HttpCode,
  UsePipes,
  UseGuards,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  SignUpDto,
  LoginDto,
  VerifyDto,
  ChangePasswordDto,
  ChangeUsernameDto,
  CheckEmailDto,
  CheckUsernameDto,
} from '../dtos/auth.dto';
import {
  ResponseEntity,
  ResponseEntityDto,
} from '../../common/types/response.entity';
import { UserTakenFilter } from '../filters/user-taken.filter';

// ANCHOR: Guards
import { AuthGuard } from '@nestjs/passport';

// ANCHOR: Pipes
import { UniquePasswordPipe } from '../pipes/unique-password.pipe';
import { ValidUsernamePipe } from '../pipes/valid-username.pipe';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ANCHOR Register a new user
  @ApiTags('auth')
  @ApiResponse({
    status: 200,
    description: 'User created successfully',
    type: ResponseEntityDto,
  })
  @Post('signup')
  @UseFilters(UserTakenFilter)
  @UsePipes(ValidationPipe, ValidUsernamePipe)
  signup(
    @Body()
    user: SignUpDto,
  ): Promise<ResponseEntity> {
    return this.authService.signup(user);
  }

  // ANCHOR Login a user
  @ApiTags('auth')
  @Post('signin')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  signin(@Body() dto: LoginDto): Promise<ResponseEntity> {
    return this.authService.signin(dto);
  }

  // ANCHOR Verify user by code and id in query
  @ApiTags('auth')
  @Post('verify')
  @UsePipes(ValidationPipe)
  verify(
    @Query()
    data: VerifyDto,
  ): Promise<ResponseEntity> {
    return this.authService.verify(data);
  }

  // ANCHOR Change user password
  @ApiTags('auth')
  @Post('change-password')
  @UsePipes(ValidationPipe, UniquePasswordPipe)
  @UseGuards(AuthGuard('jwt'))
  changePassword(
    @Body()
    data: ChangePasswordDto,
  ): Promise<ResponseEntity> {
    return this.authService.changePassword(data);
  }

  // ANCHOR Change user username
  @ApiTags('auth')
  @Post('change-username')
  @UsePipes(ValidationPipe, ValidUsernamePipe)
  @UseGuards(AuthGuard('jwt'))
  changeUsername(
    @Body()
    data: ChangeUsernameDto,
  ): Promise<ResponseEntity> {
    return this.authService.changeUsername(data);
  }

  // ANCHOR Check if username is available
  @ApiTags('auth')
  @Post('username-available')
  @UsePipes(ValidationPipe, ValidUsernamePipe)
  usernameAvailable(
    @Body()
    data: CheckUsernameDto,
  ): Promise<ResponseEntity> {
    return this.authService.checkUsername(data.username);
  }

  // ANCHOR Check if email is available
  @ApiTags('auth')
  @Post('email-available')
  @UsePipes(ValidationPipe)
  emailAvailable(
    @Body()
    data: CheckEmailDto,
  ): Promise<ResponseEntity> {
    return this.authService.checkEmail(data.email);
  }
}
