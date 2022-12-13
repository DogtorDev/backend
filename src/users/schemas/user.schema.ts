import * as mongoose from 'mongoose';
import { RoleEntity } from '../entities/roles.enum';
import * as randomize from 'randomatic';
import { GeoSchema } from 'src/common/types/geo.types';

export const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 320,
    },
    role: {
      type: String,
      enum: Object.values(RoleEntity),
      default: RoleEntity.CUSTOMER,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: randomize('Aa0', 32),
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    bannedReason: {
      type: String,
      default: '',
    },
    profileImage: {
      type: String,
      default: '',
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    stores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
      },
    ],
    deliveryOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    locations: {
      type: [],
      default: [],
    },
    paymentOptions: {
      type: [],
      default: [],
    },
    currentLocation: {
      type: GeoSchema || null,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
