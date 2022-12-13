import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class BanUserDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsString()
  reason: string;
}

export class OnlyUserIdDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}

export class EditDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  email: string;
}
