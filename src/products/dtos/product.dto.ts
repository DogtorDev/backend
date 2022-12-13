import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    mainImage: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    basePrice: {
      type: Number,
      required: true,
    },
    variants: [
      {
        type: [{}],
      },
    ],
    dimentions: {
      type: String,
      trim: true,
    },
    weight: {
      type: String,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isPromo: {
      type: Boolean,
      default: false,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory',
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
  },
);

// DTO based on the schema

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateProductDto {
  // storeId
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  storeId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mainImage: string;

  @ApiProperty()
  @IsOptional()
  images: string[];

  @ApiProperty()
  @IsNotEmpty()
  basePrice: number;

  @ApiProperty()
  @IsOptional()
  variants: any[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  dimentions: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  weight: string;

  @ApiProperty()
  @IsOptional()
  isFeatured: boolean;

  @ApiProperty()
  @IsOptional()
  isPublished: boolean;

  @ApiProperty()
  @IsOptional()
  isPromo: boolean;

  @ApiProperty()
  @IsOptional()
  categories: string[];
}

export class UpdateProductDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mainImage: string;

  @ApiProperty()
  @IsOptional()
  images: string[];

  @ApiProperty()
  @IsOptional()
  basePrice: number;

  @ApiProperty()
  @IsOptional()
  variants: any[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  dimentions: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  weight: string;

  @ApiProperty()
  @IsOptional()
  isFeatured: boolean;

  @ApiProperty()
  @IsOptional()
  isPublished: boolean;

  @ApiProperty()
  @IsOptional()
  isPromo: boolean;

  @ApiProperty()
  @IsOptional()
  categories: string[];
}
