import { ApiProperty } from "@nestjs/swagger";
import { FavoriteDto } from "./favorite.dto";

export class ResponseFavoriteDto {
  @ApiProperty()
  favorite: FavoriteDto;
  
  @ApiProperty()
  message: string;
}

