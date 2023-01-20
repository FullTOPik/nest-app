import { PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './cart-create.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) { }
