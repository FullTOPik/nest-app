import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationResponseDto } from "src/common/dto/pagination-response.dto";
import { DEFAULT_PAGE_SIZE } from "src/constants";
import { Like, Repository } from "typeorm";
import { SearchPointDto } from "../dto/point-search.dto";
import { Point } from "../models/point.models";

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private pointRepository: Repository<Point>
  ) { }

  async search(searchPointDto: SearchPointDto): Promise<PaginationResponseDto<Point>> {
    const [points, countPoints] = await this.pointRepository.findAndCount({
      where: { address: Like(`%${searchPointDto.text}%`) },
      take: searchPointDto.pageSize || DEFAULT_PAGE_SIZE,
      skip: searchPointDto.pageSize * searchPointDto.pageNumber || 0,
    });
    const countPages = countPoints / searchPointDto.pageSize || DEFAULT_PAGE_SIZE;

    return {
      data: points,
      total: countPages,
      pageNumber: searchPointDto.pageNumber,
      pageSize: searchPointDto.pageSize,
    }
  }
}

