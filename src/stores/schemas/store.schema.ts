import mongoose from 'mongoose';
import { GeoSchema } from '../../common/types/geo.types';

export const StoreSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  mainImage: {
    type: String,
    default: '',
  },
  images: {
    type: [],
    default: [],
  },
  location: {
    type: GeoSchema || null,
    default: null,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StoreCategory',
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isBranch: {
    type: Boolean,
    default: false,
  },
  parentStore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  },
  workingHours: {
    type: {},
    default: null,
  },
  isDisabled: {
    type: Boolean,
    default: true,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
});
