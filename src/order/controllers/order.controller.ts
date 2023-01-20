import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
  HttpStatus,
  Query
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppRequest } from 'src/common/dto/app-request.dto';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(private orderService: OrderService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginationResponseDto<Order>,
  })
  @ApiOperation({ description: 'Get all created orders of the user' })
  getOrders(
    @Query() paginationDto: PaginationDto,
    @Req() appRequest: AppRequest): Promise<PaginationResponseDto<Order>> {
    return this.orderService.getOrders(appRequest.user.id, paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Order,
  })
  @ApiOperation({ description: 'Get order information' })
  getInfoOrder(
    @Req() appRequest: AppRequest,
    @Param('id', ParseIntPipe) orderId: number,
  ): Promise<Order> {
    return this.orderService.getItemsOrder(appRequest.user.id, orderId);
  }
}
