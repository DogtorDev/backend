import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
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
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<any>,
    @Inject(REQUEST) private request: Request,
  ) {}

  // ANCHOR: Create Product
  async create(payload: CreateProductDto): Promise<ResponseEntity> {
    const newProduct = new this.productModel(payload);

    try {
      const product = await newProduct.save();
      return {
        statusCode: 201,
        message: 'Product created successfully',
        data: product,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Product already exists');
      }
      throw new UnauthorizedException(error.message);
    }
  }

  // ANCHOR: Get All Products of storeId
  async findAll(storeId: string): Promise<ResponseEntity> {
    try {
      const products = await this.productModel.find({ storeId });
      return {
        statusCode: 200,
        message: 'Products fetched successfully',
        data: products,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  // ANCHOR: Get Product by Id
  async findOne(id: string): Promise<ResponseEntity> {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return {
        statusCode: 200,
        message: 'Product fetched successfully',
        data: product,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  // ANCHOR: Update Product
  async update(id: string, payload: UpdateProductDto): Promise<ResponseEntity> {
    try {
      const product = await this.productModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return {
        statusCode: 200,
        message: 'Product updated successfully',
        data: product,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  // ANCHOR: Delete Product
  async remove(id: string): Promise<ResponseEntity> {
    try {
      const product = await this.productModel.findByIdAndDelete(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return {
        statusCode: 200,
        message: 'Product deleted successfully',
        data: product,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
