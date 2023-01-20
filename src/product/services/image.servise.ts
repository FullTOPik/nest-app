import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveImageDto } from '../dto/image-save.dto';
import { Image } from '../models/image.model';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  saveImage(saveImageDto: SaveImageDto): Promise<Image> {
    return this.imageRepository.save(saveImageDto);
  }

  getImage(productId: number): Promise<Image[]> {
    return this.imageRepository.find({ where: { productId } });
  }
}

