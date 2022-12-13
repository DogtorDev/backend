import { IsString, IsNotEmpty, IsMongoId, IsEnum } from 'class-validator';
import { RoleEntity } from '../entities/roles.enum';

export class ChangeRoleDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(RoleEntity)
  role: RoleEntity;
}
