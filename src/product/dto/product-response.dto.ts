import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ProductDto } from './product.dto';
import { Image } from '../models/image.model';

export class ResponseProductDto extends PartialType(ProductDto) {
  @ApiProperty({ type: Image || [Image] })
  @IsNotEmpty()
  images: Image[] | Image;
}

