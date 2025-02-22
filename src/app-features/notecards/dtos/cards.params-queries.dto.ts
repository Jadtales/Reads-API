import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';

export class CardsStatsQueryDTO {
  @IsNotEmpty()
  @IsString()
  @IsIn(['total', 'mean', 'median', 'max', 'min'])
  typeOfStat: 'total' | 'mean' | 'median' | 'max' | 'min';

  @IsNotEmpty()
  @IsString()
  @IsIn(['perMonth', 'perWeek', 'perDay', 'perYear'])
  duration: 'perMonth' | 'perWeek' | 'perDay' | 'perYear';
}

export class CardsQueryDTO {
  @IsOptional()
  @IsNumber()
  @Max(50)
  limit?: number = 20; // Limit the number of results (for paginated stats)

  @IsOptional()
  @IsNumber()
  @Max(10)
  page?: number = 1;

  @IsOptional()
  @IsString()
  filterByTag?: string;

  @IsOptional()
  @IsNumber()
  minLikes?: number;

  @IsOptional()
  @IsNumber()
  minRating?: number;

  @IsOptional()
  @IsDate()
  fromDate?: Date;

  @IsOptional()
  @IsDate()
  toDate?: Date;

  @IsOptional()
  @IsString()
  sortBy?: 'likes' | 'views' | 'creationDate';
}
