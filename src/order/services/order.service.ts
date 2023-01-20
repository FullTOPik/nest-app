import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InformationMessage } from 'src/common/interfaces/information-message.interface';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../models/order.model';
import { ItemOrder } from '../models/order-item.model';
import { Product } from 'src/product/models/product.model';
import { Cart } from 'src/cart/models/cart.model';
import { PaginationDto } from 'src/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(ItemOrder)
    private itemOrderRepository: Repository<ItemOrder>,
    private dataSource: DataSource,
  ) {}

  async repeatOrder(
    userId: number,
    orderId: number,
  ): Promise<InformationMessage> {
    const currentOrder = await this.findOne(userId, orderId);

    if (!currentOrder) {
      throw new BadRequestException('There is no order');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(Cart, { userId });

      await Promise.all(
        currentOrder.itemOrder.map(async (itemOrder) => {
          if (itemOrder.count - itemOrder.removed < 1) {
            return;
          }

          return await queryRunner.manager.save(Cart, {
            userId,
            productId: itemOrder.productId,
            count: itemOrder.count - itemOrder.removed,
          });
        }),
      );
      await queryRunner.commitTransaction();

      return { message: 'The items in the cart have been updated' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createOrder(
    userId: number,
    pointId: number,
  ): Promise<InformationMessage> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await queryRunner.manager.save(Order, {
        pointId,
        userId,
        date: new Date(),
      });

      const cart = await queryRunner.manager.find(Cart, {
        where: { userId },
        relations: { product: true },
      });

      if (!cart[0]) {
        throw new BadRequestException(
          'Cart is empty, add items before ordering',
        );
      }

      await Promise.all(
        cart.map(async (product) => {
          if (
            product.count > product.product.amount ||
            product.product.amount < 1
          ) {
            throw new BadRequestException(
              `There are ${product.product.amount} ${product.product.name} left in stock, you ordered ${product.count}`,
            );
          }

          await queryRunner.manager.save(ItemOrder, {
            orderId: order.id,
            productId: product.productId,
            name: product.product.name,
            cost: product.product.cost,
            count: product.count,
          });

          await queryRunner.manager.decrement(
            Product,
            product.product,
            'amount',
            product.count,
          );
        }),
      );

      await queryRunner.manager.delete(Cart, { userId });
      await queryRunner.commitTransaction();

      return {
        message: 'The order was placed',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new BadRequestException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(userId: number, orderId: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { userId, id: orderId },
      relations: { itemOrder: true },
    });
  }

  async getOrders(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<Order>> {
    const [orders, countOrders] = await this.orderRepository.findAndCount({
      where: { userId },
      skip: paginationDto.pageNumber * paginationDto.pageSize || 0,
      take: paginationDto.pageSize || DEFAULT_PAGE_SIZE,
    });
    const countPages = countOrders / (paginationDto.pageSize || DEFAULT_PAGE_SIZE);

    return {
      data: orders,
      total: countPages,
      pageNumber: paginationDto.pageNumber,
      pageSize: paginationDto.pageSize,
    }
  }

  async removeItemOrderById(
    itemOrderId: number,
    removedCount: number,
  ): Promise<InformationMessage> {
    const itemOrder = await this.itemOrderRepository.findOne({
      where: { id: itemOrderId },
    });
    if (!itemOrder) {
      throw new BadRequestException(
        `The order with id ${itemOrderId} does not exist`,
      );
    }
    const maxRemoveCount = itemOrder.count - itemOrder.removed;

    if (removedCount > maxRemoveCount || removedCount < 1) {
      throw new BadRequestException(
        `The item is allowed to delete ${maxRemoveCount}, you delete ${removedCount}`,
      );
    }
    await this.itemOrderRepository.increment(
      itemOrder,
      'removed',
      removedCount,
    );

    return { message: 'The item was removed from the order' };
  }

  getOrdersCurrentUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({ where: { userId } });
  }

  getItemsOrder(userId: number, orderId: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { userId, id: orderId },
      relations: { itemOrder: true },
    });
  }
}
