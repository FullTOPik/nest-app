import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InformationMessage } from 'src/common/interfaces/information-message.interface';
import { ProductService } from 'src/product/services/product.service';
import { Repository } from 'typeorm';
import { RequestFavoriteDto } from '../dto/favorite-request.dto';
import { ResponseFavoriteDto } from '../dto/favorite-response.dto';
import { Favorite } from '../models/favorite.model';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    private productService: ProductService,
  ) {}

  getAll(userId: number): Promise<Favorite[]> {
    return this.favoriteRepository.find({
      where: { userId },
    });
  }

  async addFavorite(dto: RequestFavoriteDto): Promise<ResponseFavoriteDto> {
    const favoriteData = await this.favoriteRepository.findOne({
      where: dto,
    });
    if (favoriteData) {
      throw new BadRequestException('The product has already been added');
    }
    await this.productService.getOne(dto.productId);
    const favorite = await this.favoriteRepository.save(dto);

    return {
      favorite,
      message: 'Product was successfully added to favorites',
    };
  }

  async removeFavorite(productId: number): Promise<InformationMessage> {
    const deleteResult = await this.favoriteRepository.delete({ productId });

    if (deleteResult.affected) {
      throw new BadRequestException('The item has already been deleted');
    }

    return { message: 'Product deleted' };
  }
}
