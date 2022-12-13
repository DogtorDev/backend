import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsMongoId,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ResponseEntity {
  statusCode: number;
  message: string;
  token?: string;
  data?: any;
}

export class ResponseEntityDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  statusCode: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;

  @IsString()
  @ApiProperty()
  token?: string;

  @IsString()
  @ApiProperty()
  data?: any;
}
