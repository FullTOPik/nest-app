import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  pageNumber?: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageSize?: number;
}
