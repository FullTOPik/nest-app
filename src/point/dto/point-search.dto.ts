import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { PaginationDto } from "src/dto/pagination.dto";

export class SearchPointDto extends PartialType(PaginationDto) {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  text: string;
}

