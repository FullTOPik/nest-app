import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InformationMessage } from 'src/common/interfaces/information-message.interface';
import { PersonRole } from 'src/user/models/user.model';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { OrderService } from '../services/order.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('admin/orders')
@ApiTags('admin')
export class OrderAdminController {
  constructor(private orderService: OrderService) { }

  @Post(':id')
  @Roles(PersonRole.Admin)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: InformationMessage,
  })
  @ApiOperation({ description: 'Removing an item from an order' })
  removeItemOrder(
    @Param('id', ParseIntPipe) itemOrderId: number,
    @Body('count', ParseIntPipe) count: number,
  ): Promise<InformationMessage> {
    return this.orderService.removeItemOrderById(itemOrderId, count);
  }
}
