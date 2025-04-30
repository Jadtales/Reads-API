import {
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsArray,
  Min,
  Max,
  IsDecimal,
} from 'class-validator';
import { IntersectionType } from "@nestjs/mapped-types";

export class GetBookByIdTypeDto {
  @IsNumber()
  id: number;

  @IsString()
  bookName: string;

  @IsString()
  bookAuthor: string;

  @IsOptional()
  @IsString()
  bookDescription?: string;

  // Rating between 0 and 5

  @IsOptional()
  @IsDecimal()
  @Min(0)
  @Max(5)
  bookRating?: number = 0;

  // Reanotes encourages the (If I'd give a book 6 stars <3)
  @IsOptional()
  @IsDecimal()
  @Min(0)
  @Max(6)
  bookReanotesRating: number = 0;

  @IsString()
  bookCover: string;

  @IsDate()
  bookReleaseDate: Date;


  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bookGenres?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bookThemes?: string[];
}

export class GetBookByIdResponseDto extends IntersectionType(GetBookByIdTypeDto) {}