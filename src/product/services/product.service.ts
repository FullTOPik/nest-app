import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { FileService } from 'src/file/services/file.service';
import { ResponseProductDto } from '../dto/product-response.dto';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../models/product.model';
import { ImageService } from './image.servise';
import { ProductGetDto } from '../dto/products-get.dto';
import { ProductSearchDto } from '../dto/product-search.dto';
import { FilterByEnum } from '../enums/product-enum';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private fileService: FileService,
    private imageService: ImageService,
  ) { }

  async create(
    dto: ProductDto,
    image: Express.Multer.File,
  ): Promise<ResponseProductDto> {
    const imagePath = this.fileService.createFile(image);
    const date = new Date();
    const product = await this.productRepository.save({ ...dto, date });

    const imageData = await this.imageService.saveImage({
      path: imagePath,
      productId: product.id,
    });

    return {
      ...product,
      images: imageData,
    };
  }

  updateCount(productId: number, productAmount: number): Promise<UpdateResult> {
    return this.productRepository.update(
      { id: productId },
      { amount: productAmount },
    );
  }

  async updateOne(
    dto: ProductDto,
    image: Express.Multer.File,
  ): Promise<{ message: string }> {
    const imagePath = this.fileService.createFile(image);

    const productData = await Promise.all([
      this.productRepository.update({ id: dto.id }, { ...dto }),
      this.imageService.saveImage({
        path: imagePath,
        productId: dto.id,
      }),
    ]);

    if (!productData) {
      throw new BadRequestException('Error updating products');
    }

    return {
      message: 'The product has been updated',
    };
  }

  async getOne(productId: number): Promise<ResponseProductDto> {
    try {
      const [product, imagesProduct] = await Promise.all([
        this.productRepository.findOneOrFail({
          where: { id: productId },
        }),
        this.imageService.getImage(productId),
      ]);

      return {
        ...product,
        images: imagesProduct,
      };
    } catch (error) {
      throw new BadRequestException('The product does not exist');
    }
  }

  async getProducts(
    productGetDto: ProductGetDto,
  ): Promise<PaginationResponseDto<Product>> {
    const params = {
      take: productGetDto.pageSize || DEFAULT_PAGE_SIZE,
      order: { [productGetDto.sortBy]: [productGetDto.sortOrder] },
      skip:
        productGetDto.pageSize * productGetDto.pageNumber || DEFAULT_PAGE_SIZE,
      relations: { image: true },
    };

    if (!productGetDto.filterBy || !productGetDto.filterOrder) {
      const [products, numberProducts] =
        await this.productRepository.findAndCount({ ...params });
      const countPages =
        numberProducts / (productGetDto.pageSize || DEFAULT_PAGE_SIZE);

      return {
        data: products,
        total: countPages,
        pageNumber: productGetDto.pageNumber,
        pageSize: productGetDto.pageSize,
      };
    }

    const [products, numberProducts] =
      await this.productRepository.findAndCount({
        ...params,
        where: {
          [productGetDto.filterBy]: Like(`%${productGetDto.filterOrder}%`),
        },
      });
    const countPages =
      numberProducts / (productGetDto.pageSize || DEFAULT_PAGE_SIZE);

    return {
      data: products,
      total: countPages,
      pageNumber: productGetDto.pageNumber,
      pageSize: productGetDto.pageSize,
    };
  }

  async search(
    productSearchDto: ProductSearchDto,
  ): Promise<PaginationResponseDto<Product>> {
    const [products, numberProducts] =
      await this.productRepository.findAndCount({
        take: productSearchDto.pageSize || DEFAULT_PAGE_SIZE,
        skip: productSearchDto.pageNumber * productSearchDto.pageSize || 0,
        where: {
          [FilterByEnum.Name]: Like(`%${productSearchDto.search}%`),
        },
        order: {
          name: 'DESC',
        },
        relations: {
          image: true,
        },
      });
    const countPages =
      numberProducts / (productSearchDto.pageSize || DEFAULT_PAGE_SIZE);

    return {
      data: products,
      total: countPages,
      pageNumber: productSearchDto.pageNumber,
      pageSize: productSearchDto.pageSize,
    };
  }

  async getNewProducts(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<Product>> {
    const [products, numberProducts] =
      await this.productRepository.findAndCount({
        order: {
          date: 'DESC',
        },
        relations: {
          image: true,
        },
        skip: paginationDto.pageNumber * paginationDto.pageSize || 0,
        take: paginationDto.pageSize || DEFAULT_PAGE_SIZE,
      });

    const countPages =
      numberProducts / (paginationDto.pageSize || DEFAULT_PAGE_SIZE);

    return {
      data: products,
      total: countPages,
      pageNumber: paginationDto.pageNumber,
      pageSize: paginationDto.pageSize,
    };
  }
}
