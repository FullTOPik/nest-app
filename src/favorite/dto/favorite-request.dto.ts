import { OmitType } from '@nestjs/swagger';
import { FavoriteDto } from './favorite.dto';

export class RequestFavoriteDto extends OmitType(FavoriteDto, ['id']) { }

