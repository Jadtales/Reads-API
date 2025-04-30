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

export class notecardDataDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  term?: string;

  @IsString()
  @IsOptional()
  definition?: string;

  @IsBoolean()
  @IsOptional()
  isStared?: boolean = false;
}

export class CardCreationDTO {
  @IsInt()
  @IsOptional()
  notecardId?: number;

  @IsString()
  @IsOptional()
  notecardCreatorId?: string;

  @IsString()
  @IsNotEmpty()
  notecardTitle: string;

  @IsString()
  @IsOptional()
  notecardDescription?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => notecardDataDto)
  notecardData?: notecardDataDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notecardTags?: string[];

  @IsInt()
  @IsOptional()
  notecardLikes?: number;

  @IsNumber()
  @IsOptional()
  notecardRating?: number;

  @IsInt()
  @IsOptional()
  viewCount?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class UpdateNotecard {
  @IsInt()
  @IsNotEmpty()
  notecardId: number;

  @IsString()
  @IsNotEmpty()
  notecardCreatorId: string;

  @IsString()
  @IsOptional()
  notecardTitle?: string;

  @IsString()
  @IsOptional()
  notecardDescription?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => notecardDataDto)
  notecardData?: { data: notecardDataDto[] };

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notecardTags?: string[];

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
