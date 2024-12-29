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
  filterByTag?: string; // Option to filter results based on a specific tag

  @IsOptional()
  @IsNumber()
  minLikes?: number; // Filter for cards with a minimum number of likes

  @IsOptional()
  @IsNumber()
  minRating?: number; // Filter for cards with a minimum average rating

  @IsOptional()
  @IsDate()
  fromDate?: Date; // Option to filter statistics from a specific starting date

  @IsOptional()
  @IsDate()
  toDate?: Date; // Option to filter statistics until a specific end date

  @IsOptional()
  @IsString()
  sortBy?: 'likes' | 'views' | 'creationDate'; // Option to sort the statistics based on a specific attribute
}
