import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AvailableTime } from 'src/common/utils/time.types';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  ownerId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  mainImage: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  images: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  location: {};

  @IsString()
  @IsOptional()
  @ApiProperty()
  products: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  categories: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isBranch: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  parentStore: string;

  @IsOptional()
  @ApiProperty()
  workingHours: AvailableTime | null;
}

export class UpdateStoreDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  slug: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  ownerId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  mainImage: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  images: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  location: {};

  @IsString()
  @IsOptional()
  @ApiProperty()
  products: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  categories: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isBranch: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  parentStore: string;

  @IsOptional()
  @ApiProperty()
  workingHours: AvailableTime | null;
}

export class UpdateAdminsDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  admins: string[];
}

export class UpdateAvailabilityDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isDisabled: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isClosed: boolean;
}
