import {
  CreateStoreCategoryDto,
  UpdateStoreCategoryDto,
} from '../dtos/store-category.dto';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ResponseEntity } from '../../common/types/response.entity';

@Injectable()
export class StoreCategoryService {
  constructor(
    @InjectModel('StoreCategory')
    private readonly storeCategoryModel: Model<any>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  // ANCHOR Create store category
  async create(dto: CreateStoreCategoryDto): Promise<ResponseEntity> {
    const category = await this.storeCategoryModel.findOne({ slug: dto.slug });

    if (category) {
      throw new ConflictException('Category already exists');
    }

    const newCategory = new this.storeCategoryModel(dto);
    await newCategory.save();

    const res: ResponseEntity = {
      statusCode: 201,
      message: 'Category created',
      data: newCategory,
    };

    return res;
  }

  // ANCHOR Edit store category
  async edit(id: string, dto: UpdateStoreCategoryDto): Promise<ResponseEntity> {
    const category = await this.storeCategoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const editedCategory = await this.storeCategoryModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Category edited',
      data: editedCategory,
    };

    return res;
  }

  // ANCHOR: Delete store category
  async delete(id: string): Promise<ResponseEntity> {
    const category = await this.storeCategoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.storeCategoryModel.findByIdAndDelete(id);

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Category deleted',
    };

    return res;
  }

  // ANCHOR: Get all store categories
  async getAll(): Promise<ResponseEntity> {
    const categories = await this.storeCategoryModel.find();

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Categories fetched',
      data: categories,
    };

    return res;
  }

  // ANCHOR: Get store category by id or slug
  async getByIdOrSlug(idOrSlug: string): Promise<ResponseEntity> {
    const category = await this.storeCategoryModel.findOne({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Category fetched',
      data: category,
    };

    return res;
  }
}
