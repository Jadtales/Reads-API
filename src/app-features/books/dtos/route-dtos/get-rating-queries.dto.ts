import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
  ValidateNested
} from "class-validator";
import { Type } from 'class-transformer';

class SinceDateDTO {
  @IsOptional()
  @IsNumber()
  month?: number;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsNumber()
  weeks?: number;

  @IsString()
  @IsOptional()
  getOn: 'after' | 'before' | 'on' = 'after';
}

export class GetRatingRequestDto {
  @IsOptional()
  @IsString()
  timing: 'latest' | 'oldest' = 'latest';

  @IsOptional()
  @IsString()
  quantity: 'one' | 'many' = 'many';

  @IsNotEmpty()
  @IsString()
  ratedBy: 'reanotes' | 'community';

  @IsOptional()
  @IsDecimal()
  @Min(0)
  @Max(6)
  rating?: number = 5;

  @IsOptional()
  @ValidateNested()
  @Type(() => SinceDateDTO)
  sinceDate?: SinceDateDTO;
}
