import { IsNumber, IsOptional, IsPositive, Max } from 'class-validator';

export default class PaginationQueryDTO {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Max(50)
  limit?: number = 10;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Max(10)
  page?: number = 1;
}
