import { Type } from 'class-transformer';
import { IsInt,  IsString, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  page_size: number;

  @IsString()
  order_by?: string;

  @IsString()
  order_direction?: 'ASC' | 'DESC';
}

export class PaginatedResponseDto<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  page_count: number;

  static create<T>(
    items: T[],
    total: number,
    page: number,
    page_size: number,
  ): PaginatedResponseDto<T> {
    const page_count = Math.ceil(total / page_size);

    return {
      items,
      total,
      page,
      page_size,
      page_count,
    };
  }
}
