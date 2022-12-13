import {
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from '../dtos/product-category.dto';
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
export class ProductCategoryService {
  constructor(
    @InjectModel('ProductCategory')
    private readonly productCategoryModel: Model<any>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  // ANCHOR Create product category
  async create(dto: CreateProductCategoryDto): Promise<ResponseEntity> {
    const category = await this.productCategoryModel.findOne({
      slug: dto.slug,
    });

    if (category) {
      throw new ConflictException('Category already exists');
    }

    const newCategory = new this.productCategoryModel(dto);
    await newCategory.save();

    const res: ResponseEntity = {
      statusCode: 201,
      message: 'Category created',
      data: newCategory,
    };

    return res;
  }

  // ANCHOR Edit product category
  async edit(
    id: string,
    dto: UpdateProductCategoryDto,
  ): Promise<ResponseEntity> {
    const category = await this.productCategoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const editedCategory = await this.productCategoryModel.findByIdAndUpdate(
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

  // ANCHOR Delete product category
  async delete(id: string): Promise<ResponseEntity> {
    const category = await this.productCategoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.productCategoryModel.findByIdAndDelete(id);

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Category deleted',
    };

    return res;
  }

  // ANCHOR Get all product categories by storeId
  async getAllByStoreId(storeId: string): Promise<ResponseEntity> {
    const categories = await this.productCategoryModel.find({ storeId });

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Categories fetched',
      data: categories,
    };

    return res;
  }
}
