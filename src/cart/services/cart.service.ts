import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCartDto } from '../dto/cart-create.dto';
import { Cart } from '../models/cart.model';
import { InformationMessage } from 'src/common/interfaces/information-message.interface';
import { Product } from 'src/product/models/product.model';
import { PaginationDto } from 'src/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  create(createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartRepository.save(createCartDto);
  }

  async clearCart(userId: number): Promise<InformationMessage> {
    await this.cartRepository.delete({ userId });

    return { message: 'The cart has been cleaned' };
  }

  async addProduct(
    userId: number,
    productId: number,
  ): Promise<UpdateResult | Cart> {
    const cartItem = await this.cartRepository.findOne({
      where: { userId, productId },
    });

    try {
      return await this.cartRepository.increment(cartItem, 'count', 1);
    } catch (error) {
      return this.cartRepository.save({ userId, productId });
    }
  }

  async removeProduct(
    userId: number,
    productId: number,
  ): Promise<InformationMessage | UpdateResult> {
    const cartItem = await this.cartRepository.findOne({
      where: { userId, productId },
    });

    if (!cartItem) {
      throw new BadRequestException('Item not in shopping cart');
    }

    if (cartItem.count > 1) {
      return this.cartRepository.decrement(cartItem, 'count', 1);
    }

    this.cartRepository.delete(cartItem);

    return {
      message: 'The item was removed from the cart',
    };
  }

  async findAllById(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<Cart>> {
    const [itemsCart, countItemsCart] = await this.cartRepository.findAndCount({
      where: { userId },
      relations: { product: { image: true, ...Product } },
      take: paginationDto.pageSize || DEFAULT_PAGE_SIZE,
      skip: paginationDto.pageNumber * paginationDto.pageSize || 0,
    });
    const countPages =
      countItemsCart / (paginationDto.pageSize || DEFAULT_PAGE_SIZE);

    return {
      data: itemsCart,
      total: countPages,
      pageNumber: paginationDto.pageNumber,
      pageSize: paginationDto.pageSize,
    };
  }
}
