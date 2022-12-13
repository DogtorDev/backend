import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';
import { ApiParam } from '@nestjs/swagger';

export class CreateStoreCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsOptional()
  isSubCategory: boolean;

  @IsMongoId()
  @IsOptional()
  parentCategory: string;
}

export class UpdateStoreCategoryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsOptional()
  isSubCategory: boolean;

  @IsMongoId()
  @IsOptional()
  parentCategory: string;
}
