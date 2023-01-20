import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppRequest } from 'src/common/dto/app-request.dto';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';
import { InformationMessage } from 'src/common/interfaces/information-message.interface';
import { PaginationDto } from 'src/dto/pagination.dto';
import { UpdateResult } from 'typeorm';
import { Cart } from '../models/cart.model';
import { CartService } from '../services/cart.service';

@ApiTags('carts')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Cart || UpdateResult
  })
  @ApiOperation({ description: 'Add product to cart' })
  addProduct(
    @Req() appRequest: AppRequest,
    @Param('id', ParseIntPipe) productId: number,
  ): Promise<Cart | UpdateResult> {
    return this.cartService.addProduct(appRequest.user.id, productId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: InformationMessage || UpdateResult
  })
  @ApiOperation({ description: 'Remove product to cart' })
  removeProduct(
    @Req() appRequest: AppRequest,
    @Param('id', ParseIntPipe) productId: number,
  ): Promise<InformationMessage | UpdateResult> {
    return this.cartService.removeProduct(appRequest.user.id, productId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: InformationMessage
  })
  @ApiOperation({ description: 'Clear all products in the cart' })
  clearCart(@Req() appRequest: AppRequest): Promise<InformationMessage> {
    return this.cartService.clearCart(appRequest.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Cart]
  })
  @ApiOperation({ description: 'Get all products in the cart' })
  getCart(
    @Query() paginationDto: PaginationDto,
    @Req() appRequest: AppRequest
  ): Promise<PaginationResponseDto<Cart>> {
    return this.cartService.findAllById(appRequest.user.id, paginationDto);
  }
}
