import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CardDataDto {
  @IsString()
  @IsOptional()
  term: string;

  @IsString()
  @IsOptional()
  definition: string;

  @IsBoolean()
  @IsOptional()
  isStared?: boolean = false;
}

export class CardCreationDTO {
  @IsInt()
  @IsOptional()
  cardId?: number;

  @IsString()
  @IsNotEmpty()
  cardCreatorId: string;

  @IsString()
  @IsNotEmpty()
  cardTitle: string;

  @IsString()
  @IsOptional()
  cardDescription?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CardDataDto)
  cardData?: { data: CardDataDto[] };

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cardTags?: string[];

  @IsInt()
  @IsOptional()
  cardLikes?: number;

  @IsNumber()
  @IsOptional()
  cardRating?: number;

  @IsInt()
  @IsOptional()
  viewCount?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
