import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Location,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  OrderItem,
} from '../entities/order.entity';

// ANCHOR CreateOrderDto
export class CreateOrderDto {
  @IsMongoId()
  @ApiProperty()
  customerId: string;

  @IsMongoId()
  @ApiProperty()
  storeId: string;

  @IsArray()
  @ApiProperty()
  products: OrderItem[];

  @IsString()
  @ApiProperty()
  paymentMethod: PaymentMethod;

  @IsArray()
  @ApiProperty()
  customerLocation: Location;
}

// ANCHOR UpdateOrderDto
export class UpdateOrderDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  courierId: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  products: OrderItem[];

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  totalPrice: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  paymentStatus: PaymentStatus;

  @IsOptional()
  @IsString()
  @ApiProperty()
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  customerLocation: Location;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  deliveryLocation: Location;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  businessLocation: Location;

  @IsOptional()
  @IsString()
  @ApiProperty()
  orderStatus: OrderStatus;
}
