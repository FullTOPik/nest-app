import { PickType } from "@nestjs/swagger";
import { CartDto } from "./cart.dto";

export class FindCartDto extends PickType(CartDto, ['userId']) { }

