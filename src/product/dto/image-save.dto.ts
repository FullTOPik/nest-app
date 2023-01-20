import { IsNotEmpty, IsString } from 'class-validator';

export class SaveImageDto {
  @IsNotEmpty()
  @IsString()
  productId: number;

  @IsNotEmpty()
  @IsString()
  path: string;
}

