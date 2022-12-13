import * as mongoose from 'mongoose';
import { GeoSchema } from 'src/common/types/geo.types';
import {
  PaymentMethod,
  PaymentStatus,
  OrderStatus,
} from '../entities/order.entity';

export const OrderSchema = new mongoose.Schema(
  {
    id: String,
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    products: {
      type: [
        {
          productId: mongoose.Schema.Types.ObjectId,
          quantity: Number,
          ref: 'Product',
        },
      ],
      required: true,
    },
    totalPrice: Number,
    orderStatus: {
      type: OrderStatus,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    paymentStatus: {
      type: PaymentStatus,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    paymentMethod: {
      type: PaymentMethod,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    customerLocation: {
      type: GeoSchema || null,
      required: true,
    },
    deliveryLocation: {
      type: GeoSchema || null,
      default: null,
    },
    businessLocation: {
      type: GeoSchema || null,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
