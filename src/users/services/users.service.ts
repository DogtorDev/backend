import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Entities
import { ResponseEntity } from 'src/common/types/response.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserEntity>,
  ) {}

  // ANCHOR: Ban user
  async banUser(userId: string, reason: string) {
    const user = await this.userModel.findById(userId);

    let res: ResponseEntity;

    if (!user) {
      res = {
        statusCode: 404,
        message: 'User not found',
      };

      return res;
    }

    if (user.isBanned) {
      res = {
        statusCode: 400,
        message: 'User is already banned',
        data: {
          reason: user.bannedReason,
        },
      };

      return res;
    }

    user.isBanned = true;
    user.bannedReason = reason;
    await user.save();

    res = {
      statusCode: 200,
      message: 'User banned',
    };

    return res;
  }

  // ANCHOR: Unban user
  async unbanUser(userId: string) {
    const user = await this.userModel.findById(userId);

    let res: ResponseEntity;

    if (!user) {
      res = {
        statusCode: 404,
        message: 'User not found',
      };

      return res;
    }

    if (!user.isBanned) {
      res = {
        statusCode: 400,
        message: 'User is not banned',
      };

      return res;
    }

    user.isBanned = false;
    user.bannedReason = '';
    await user.save();

    res = {
      statusCode: 200,
      message: 'User unbanned',
    };

    return res;
  }

  // ANCHOR: Get all users
  async getAllUsers(): Promise<ResponseEntity> {
    const users = await this.userModel.find();

    const resp: ResponseEntity = {
      statusCode: 200,
      message: 'Users found',
      data: users,
    };

    return resp;
  }

  // ANCHOR: Get one by id, email or username
  async findOne(id: string): Promise<ResponseEntity> {
    const user = await this.userModel.findOne({
      $or: [{ _id: id }, { email: id }, { username: id }],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resp: ResponseEntity = {
      statusCode: 200,
      message: 'User found',
      data: user,
    };

    return resp;
  }

  // ANCHOR: Edit user
  async editUser(
    id: string,
    data: {
      email?: string;
      username?: string;
      role?: string;
    },
  ): Promise<ResponseEntity> {
    const user = await this.userModel.findOne({
      _id: id,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.email) {
      user.email = data.email;
    }

    if (data.username) {
      user.username = data.username;
    }

    if (data.role) {
      user.role = data.role;
    }

    await user.save();

    const resp: ResponseEntity = {
      statusCode: 200,
      message: 'User edited',
    };

    return resp;
  }

  // Delete user
  async deleteUser(userId: string) {
    const user = await this.userModel.findById(userId);

    let res: ResponseEntity;

    if (!user) {
      res = {
        statusCode: 404,
        message: 'User not found',
      };

      return res;
    }

    await user.remove();

    res = {
      statusCode: 200,
      message: 'User deleted',
    };

    return res;
  }
}
