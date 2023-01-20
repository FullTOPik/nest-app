import { OmitType } from '@nestjs/swagger';
import { CartDto } from './cart.dto';

export class AddCartDto extends OmitType(CartDto, ['id']) {}
