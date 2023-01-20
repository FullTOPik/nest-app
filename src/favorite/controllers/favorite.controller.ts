import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Param,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppRequest } from 'src/common/dto/app-request.dto';
import { InformationMessage } from 'src/common/interfaces/information-message.interface';
import { ResponseFavoriteDto } from '../dto/favorite-response.dto';
import { Favorite } from '../models/favorite.model';
import { FavoriteService } from '../services/favorite.service';

@ApiTags('favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Favorite],
  })
  @ApiOperation({ description: 'Get all the user is favorite products' })
  async getAll(@Req() appRequest: AppRequest): Promise<Favorite[]> {
    return await this.favoriteService.getAll(appRequest.user.id);
  }

  @Post(':productId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseFavoriteDto,
  })
  @ApiOperation({
    description: 'Add the selected item by its id to the Favorites category',
  })
  addFavorite(
    @Param('productId', ParseIntPipe) productId: number,
    @Req() appRequest: AppRequest,
  ): Promise<ResponseFavoriteDto> {
    return this.favoriteService.addFavorite({
      productId,
      userId: appRequest.user.id,
    });
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: InformationMessage,
  })
  @ApiOperation({
    description: 'Add the selected item by its id to the Favorites category',
  })
  removeFavorite(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<InformationMessage> {
    return this.favoriteService.removeFavorite(productId);
  }
}
