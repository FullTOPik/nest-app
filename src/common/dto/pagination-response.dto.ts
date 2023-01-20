export class PaginationResponseDto<T> {
  data: T[];
  total: number;
  pageNumber: number;
  pageSize: number;
}