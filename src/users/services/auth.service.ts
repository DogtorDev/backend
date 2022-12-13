import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginDto,
  SignUpDto,
  VerifyDto,
  ChangePasswordDto,
  ChangeUsernameDto,
} from '../dtos/auth.dto';
import { EditDto } from '../dtos/user.dto';
import { PayloadTokenEntity } from '../entities/token.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ResponseEntity } from '../../common/types/response.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<any>,
    @Inject(REQUEST) private readonly request: Request,
    private readonly jwtService: JwtService,
  ) {}

  // ANCHOR Login user
  async signin(dto: LoginDto): Promise<ResponseEntity> {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validation = await bcrypt.compare(dto.password, user.password);

    if (!validation) {
      throw new UnauthorizedException('Invalid password');
    }

    // Check if banned
    if (user.isBanned) {
      const res: ResponseEntity = {
        statusCode: 401,
        message: 'User is banned',
        data: {
          reason: user.bannedReason,
        },
      };

      return res;
    }

    const payload: PayloadTokenEntity = {
      _id: user._id,
      email: dto.email,
      role: user.role,
    };

    const resp: ResponseEntity = {
      statusCode: 200,
      message: 'Login successful',
      token: this.jwtService.sign(payload),
    };

    return resp;
  }

  // ANCHOR Register a new user
  async signup(user: SignUpDto): Promise<ResponseEntity> {
    const newUser = new this.userModel(user);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    const payload: PayloadTokenEntity = {
      _id: newUser._id,
      email: user.email,
      role: newUser.role,
    };

    const resp: ResponseEntity = {
      statusCode: 201,
      message: 'User created',
      token: this.jwtService.sign(payload),
    };

    return resp;
  }

  // ANCHOR Verify user by token
  async verify(data: VerifyDto): Promise<ResponseEntity> {
    const user = await this.userModel.findOne({
      _id: data.id,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.verificationCode === data.code) {
      user.verified = true;
      user.verificationCode = null;
      await user.save();

      const resp: ResponseEntity = {
        statusCode: 200,
        message: 'User verified',
      };

      return resp;
    }

    throw new UnauthorizedException('Invalid verification code');
  }

  // ANCHOR Change password
  async changePassword(data: ChangePasswordDto): Promise<ResponseEntity> {
    const us: any = this.request.user;

    const user = await this.userModel.findOne({
      _id: us._id,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validation = await bcrypt.compare(data.oldPassword, user.password);

    if (!validation) {
      throw new UnauthorizedException('Invalid password');
    }

    data.newPassword = await bcrypt.hash(data.newPassword, 10);

    user.password = data.newPassword;
    await user.save();

    const resp: ResponseEntity = {
      statusCode: 200,
      message: 'Password changed',
    };

    return resp;
  }

  // ANCHOR Verify username is not taken
  async checkUsername(username: string): Promise<ResponseEntity> {
    const user = await this.userModel.findOne({
      username,
    });

    if (!user) {
      const resp: ResponseEntity = {
        statusCode: 200,
        message: 'Username available',
      };

      return resp;
    }

    throw new ConflictException('Username already taken');
  }

  // ANCHOR Verify is email is not taken
  async checkEmail(email: string): Promise<ResponseEntity> {
    const user = await this.userModel.findOne({
      email,
    });

    if (!user) {
      const resp: ResponseEntity = {
        statusCode: 200,
        message: 'Email available',
      };

      return resp;
    }

    throw new ConflictException('Email already taken');
  }

  // ANCHOR Change username
  async changeUsername(data: ChangeUsernameDto): Promise<ResponseEntity> {
    const us: any = this.request.user;

    const user = await this.userModel.findOne({
      _id: us._id,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if username is not the same
    if (user.username === data.username) {
      throw new ConflictException(
        'Username needs to be different at the current one',
      );
    }

    // Validate passwords
    const validation = await bcrypt.compare(data.password, user.password);

    if (!validation) {
      throw new UnauthorizedException('Invalid password');
    }

    // Verify username is not taken
    await this.checkUsername(data.username);

    user.username = data.username;
    await user.save();

    const resp: ResponseEntity = {
      statusCode: 200,
      message: 'Username changed',
    };
    return resp;
  }
}
