import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HighlightDto {
  @IsString()
  highlightTitle: string;

  @IsString()
  highlightDescription: string;
}

export class CardDto {
  @IsInt()
  @IsNotEmpty()
  cardId: number;

  @IsString()
  cardMaker: string;

  @IsString()
  cardTitle: string;

  @IsString()
  cardDescription: string;

  @IsArray()
  @IsString({ each: true })
  cardTags: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HighlightDto)
  cardHighlights: HighlightDto[];
}
