import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaginationResponseDto } from "src/common/dto/pagination-response.dto";
import { SearchPointDto } from "../dto/point-search.dto";
import { Point } from "../models/point.models";
import { PointService } from "../services/point.service";

@Controller('points')
@ApiTags('points')
export class PointController {
  constructor(
    private pointService: PointService,
  ) { }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginationResponseDto<Point>,
  })
  @ApiOperation({ description: 'Get pickup points by their name' })
  search(
    @Query() searchPointDto: SearchPointDto,
  ): Promise<PaginationResponseDto<Point>> {
    return this.pointService.search(searchPointDto);
  }
}

