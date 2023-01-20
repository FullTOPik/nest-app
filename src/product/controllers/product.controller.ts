import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PersonRole } from 'src/user/models/user.model';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ResponseProductDto } from '../dto/product-response.dto';
import { ProductSearchDto } from '../dto/product-search.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductGetDto } from '../dto/products-get.dto';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InformationMessage } from 'src/common/interfaces/information-message.interface';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Post()
  @Roles(PersonRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseProductDto,
  })
  @ApiOperation({ description: 'Allows the administrator to create a product' })
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() productCreateDto: ProductDto,
  ): Promise<ResponseProductDto> {
    const result = await this.productService.create(productCreateDto, image);

    return result;
  }

  @Patch(':productId')
  @Roles(PersonRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({
    status: HttpStatus.OK,
    type: InformationMessage,
  })
  @ApiOperation({ description: 'Allows the administrator to update a product' })
  async update(
    @UploadedFile() image: Express.Multer.File,
    @Body() productDto: ProductDto,
    @Param('productId') id: number,
  ): Promise<InformationMessage> {
    const result = await this.productService.updateOne(
      { ...productDto, id },
      image,
    );

    return result;
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginationResponseDto<Product>,
  })
  @ApiOperation({ description: 'Get products by specified parameters' })
  getProducts(
    @Query() productGetDto: ProductGetDto,
  ): Promise<PaginationResponseDto<Product>> {
    return this.productService.getProducts(productGetDto);
  }

  @Get('search')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginationResponseDto<Product>,
  })
  @ApiOperation({ description: 'Find the required number of products by name' })
  search(
    @Query() productSearchDto: ProductSearchDto,
  ): Promise<PaginationResponseDto<Product>> {
    return this.productService.search(productSearchDto);
  }

  @Get('new')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginationResponseDto<Product>,
  })
  @ApiOperation({ description: 'Get the latest new items in a given quantity' })
  getNewProducts(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<Product>> {
    return this.productService.getNewProducts(paginationDto);
  }

  @Get(':productId')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseProductDto,
  })
  @ApiOperation({ description: 'Get the product by id' })
  getProduct(
    @Param('productId') producId: number,
  ): Promise<ResponseProductDto> {
    return this.productService.getOne(producId);
  }
}
