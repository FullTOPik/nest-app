import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class PointDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 500)
  address: string;
}

