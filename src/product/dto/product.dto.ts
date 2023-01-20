import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { CategoryEnum } from '../enums/categoty.enum';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  cost: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(CategoryEnum)
  category: CategoryEnum;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  id?: number;
}

