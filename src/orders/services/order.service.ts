import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
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
import * as NodeGeoCoder from 'node-geocoder';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<any>) {}

  // ANCHOR Create Order
  async createOrder(createOrderDto: CreateOrderDto): Promise<ResponseEntity> {
    const order = await this.orderModel.create(createOrderDto);
    return {
      statusCode: 201,
      message: 'Order created successfully',
      data: order,
    };
  }

  // ANCHOR Get All Orders
  async getAllOrdersByReferenceId(
    referenceId: string,
    paymentStatus?: string,
    orderStatus?: string,
    orderId?: string,
  ): Promise<ResponseEntity> {
    if (paymentStatus) {
      const orders = await this.orderModel.find({
        $or: [
          { customerId: referenceId },
          { storeId: referenceId },
          { courierId: referenceId },
        ],
        paymentStatus,
      });
      return {
        statusCode: 200,
        message: 'Orders fetched successfully',
        data: orders,
      };
    }
    if (orderStatus) {
      const orders = await this.orderModel.find({
        $or: [
          { customerId: referenceId },
          { storeId: referenceId },
          { courierId: referenceId },
        ],
        orderStatus,
      });
      return {
        statusCode: 200,
        message: 'Orders fetched successfully',
        data: orders,
      };
    }
    if (orderId) {
      const order = await this.orderModel.findOne({
        $or: [
          { customerId: referenceId },
          { storeId: referenceId },
          { courierId: referenceId },
        ],
        _id: orderId,
      });
      return {
        statusCode: 200,
        message: 'Order fetched successfully',
        data: order,
      };
    }

    const orders = await this.orderModel.find({
      $or: [
        { customerId: referenceId },
        { storeId: referenceId },
        { courierId: referenceId },
      ],
    });
    return {
      statusCode: 200,
      message: 'Orders fetched successfully',
      data: orders,
    };
  }

  // ANCHOR Get all Orders by Payment Status or Order Status
  async getAllOrders(
    paymentStatus?: string,
    orderStatus?: string,
  ): Promise<ResponseEntity> {
    if (paymentStatus) {
      const orders = await this.orderModel.find({ paymentStatus });
      return {
        statusCode: 200,
        message: 'Orders fetched successfully',
        data: orders,
      };
    }
    if (orderStatus) {
      const orders = await this.orderModel.find({ orderStatus });
      return {
        statusCode: 200,
        message: 'Orders fetched successfully',
        data: orders,
      };
    }

    const orders = await this.orderModel.find();
    return {
      statusCode: 200,
      message: 'Orders fetched successfully',
      data: orders,
    };
  }

  // ANCHOR Update Order
  async updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<ResponseEntity> {
    const order = await this.orderModel.findOneAndUpdate(
      { _id: orderId },
      updateOrderDto,
      { new: true },
    );
    return {
      statusCode: 200,
      message: 'Order updated successfully',
      data: order,
    };
  }

  // ANCHOR Assign order to courier
  async assignOrderToCourier(
    orderId: string,
    courierId: string,
  ): Promise<ResponseEntity> {
    // Check courierId doesnt have an order already with status CONFIRMED or ON_ROUTE and paymentStatus not CANCELLED
    const courier = await this.orderModel.findOne({
      courierId,
      orderStatus: { $in: ['CONFIRMED', 'ON_ROUTE'] },
      // paymentStatus: { $nin: ['CANCELLED'] },
    });

    if (courier) {
      throw new ConflictException(
        'Courier already has an order with status CONFIRMED or ON_ROUTE',
      );
    }

    const order = await this.orderModel.findOneAndUpdate(
      { _id: orderId },
      { courierId, orderStatus: 'CONFIRMED' },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      statusCode: 200,
      message: 'Order assigned to courier successfully',
      data: order,
    };
  }

  // ANCHOR Get available orders by my location and 2km radius to business
  async getNearOrdersByLocation(
    location: {
      lat: number;
      lng: number;
    },
    radius: number,
  ): Promise<ResponseEntity> {
    const options = {
      provider: 'google',
      apiKey: 'AIzaSyD8sZw0gKzBpZ3q3h8r1r2Q2d9Y9N7sJk8',
      formatter: null,
    };

    const geocoder = NodeGeoCoder(options);

    const orders = await this.orderModel.find({
      paymentStatus: 'PAID',
    });

    const nearOrders = [];

    for (const order of orders) {
      const storeLocation = await geocoder.geocode(order.storeLocation);
      const distance = await geocoder.distance(
        { lat: location.lat, lon: location.lng },
        { lat: storeLocation[0].latitude, lon: storeLocation[0].longitude },
      );
      // console.log(distance);
      if (distance <= radius) {
        nearOrders.push(order);
      }
    }

    return {
      statusCode: 200,
      message: 'Near orders fetched successfully',
      data: nearOrders,
    };
  }
}
