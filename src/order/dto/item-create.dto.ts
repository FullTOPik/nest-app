import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pointId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  const: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

