import { PartialType } from '@nestjs/swagger';
import { AddCartDto } from './cart-add.dto';

export class RemoveCartDto extends PartialType(AddCartDto) {}
