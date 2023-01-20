import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ImageUserRequestDto } from './user-image-request.dto';

export class ImageUserDto extends PickType(ImageUserRequestDto, ['userId']) {
  @IsNotEmpty()
  @IsString()
  image: string;
}

