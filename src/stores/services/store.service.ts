import {
  CreateStoreDto,
  UpdateAvailabilityDto,
  UpdateStoreDto,
  UpdateAdminsDto,
} from '../dtos/store.dto';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ResponseEntity } from '../../common/types/response.entity';
import { StoreEntity } from '../entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel('Store') private storeModel: Model<StoreEntity>,
  ) {}

  // ANCHOR Create store
  async create(dto: CreateStoreDto): Promise<ResponseEntity> {
    const store = await this.storeModel.findOne({ slug: dto.slug });

    if (store) {
      throw new ConflictException('Store already exists');
    }

    const newStore = new this.storeModel(dto);
    await newStore.save();

    const res: ResponseEntity = {
      statusCode: 201,
      message: 'Store created',
      data: newStore,
    };

    return res;
  }

  // ANCHOR Edit store
  async edit(id: string, dto: UpdateStoreDto): Promise<ResponseEntity> {
    const store = await this.storeModel.findById(id);

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const editedStore = await this.storeModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Store edited',
      data: editedStore,
    };

    return res;
  }

  // ANCHOR Update store availability
  async updateAvailability(
    id: string,
    dto: UpdateAvailabilityDto,
  ): Promise<ResponseEntity> {
    const store = await this.storeModel.findById(id);

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const updatedStore = await this.storeModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Store availability updated',
      data: updatedStore,
    };

    return res;
  }

  // ANCHOR Update store admins
  async updateAdmins(
    id: string,
    dto: UpdateAdminsDto,
  ): Promise<ResponseEntity> {
    const store = await this.storeModel.findById(id);

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const updatedStore = await this.storeModel.findByIdAndUpdate(
      id,
      { admins: dto.admins },
      { new: true },
    );

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Store admins updated',

      data: updatedStore,
    };

    return res;
  }

  // ANCHOR Delete store
  async delete(id: string): Promise<ResponseEntity> {
    const store = await this.storeModel.findById(id);

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    await this.storeModel.findByIdAndDelete(id);

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Store deleted',
    };

    return res;
  }

  // ANCHOR Get store by id, slug, ownerId or adminId in admins array
  async getStore(value: string): Promise<ResponseEntity> {
    const store = await this.storeModel.findOne({
      $or: [
        { _id: value },
        { slug: value },
        { ownerId: value },
        { admins: { $in: [value] } },
      ],
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Store found',
      data: store,
    };

    return res;
  }

  // ANCHOR Get all stores
  async getAll(location?: {
    lat: number;
    lng: number;
  }): Promise<ResponseEntity> {
    // Use aggregate to find all nearby stores and sort them by distance
    let stores = [];

    if (location) {
      stores = await this.storeModel.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [location.lng, location.lat],
            },
            distanceField: 'distance',
            spherical: true,
          },
        },
        {
          $sort: { distance: 1 },
        },
      ]);
    } else {
      stores = await this.storeModel.find();
    }

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Stores found',
      data: stores,
    };

    return res;
  }

  // ANCHOR Get store and branches
  async getStoreAndBranches(id: string): Promise<ResponseEntity> {
    const store = await this.storeModel.findById(id);

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const branches = await this.storeModel.find({ parentStore: id });

    const res: ResponseEntity = {
      statusCode: 200,
      message: 'Stores found',
      data: { store, branches },
    };

    return res;
  }
}
