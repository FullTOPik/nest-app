import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/dto/pagination.dto';
import { FindOptionsOrderValue } from 'typeorm';
import { FilterByEnum, SortByEnum } from '../enums/product-enum';

export class ProductGetDto extends PartialType(PaginationDto) {
  @IsNotEmpty()
  @IsString()
  @IsEnum(SortByEnum)
  sortBy: SortByEnum;

  @IsNotEmpty()
  @IsString()
  sortOrder: FindOptionsOrderValue;

  @IsNotEmpty()
  @IsString()
  last: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEnum(FilterByEnum)
  filterBy?: FilterByEnum;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  filterOrder?: string;
}

