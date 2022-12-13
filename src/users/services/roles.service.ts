import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseEntity } from 'src/common/types/response.entity';

import { RoleEntity } from '../entities/roles.enum';

@Injectable()
export class RolesService {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  // ANCHOR Change user role
  async changeUserRole(userId: string, role: RoleEntity) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      const resp: ResponseEntity = {
        statusCode: 201,
        message: 'User not found',
      };

      return resp;
    }

    user.role = role;
    await user.save();

    const resp: ResponseEntity = {
      statusCode: 200,
      message: 'User role changed',
    };

    return resp;
  }

  // ANCHOR Get available roles enum
  async getAvailableRoles() {
    const roles = Object.keys(RoleEntity).map((key) => RoleEntity[key]);

    const resp: ResponseEntity = {
      statusCode: 200,
      message: 'Available roles',
      data: roles,
    };

    return resp;
  }
}
