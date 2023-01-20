import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppRequest } from 'src/common/dto/app-request.dto';
import { InformationMessage } from 'src/common/interfaces/information-message.interface';
import { PersonRole } from 'src/user/models/user.model';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { OrderService } from '../services/order.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('orders')
@ApiTags('orders')
export class OrderUserController {
  constructor(private orderService: OrderService) { }

  @Post(':id')
  @Roles(PersonRole.User)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: InformationMessage,
  })
  @ApiOperation({ description: 'Creating an order from a user is cart' })
  createOrder(
    @Req() appRequest: AppRequest,
    @Param('id', ParseIntPipe) pointId: number,
  ): Promise<InformationMessage> {
    return this.orderService.createOrder(appRequest.user.id, pointId);
  }

  @Post('repeat/:id')
  @Roles(PersonRole.User)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: InformationMessage,
  })
  @ApiOperation({ description: 'Repeat user order' })
  repeatOrder(
    @Req() appRequest: AppRequest,
    @Param('id', ParseIntPipe) orderId: number,
  ): Promise<InformationMessage> {
    return this.orderService.repeatOrder(appRequest.user.id, orderId);
  }
}
