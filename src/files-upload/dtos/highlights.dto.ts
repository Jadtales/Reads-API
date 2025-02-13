import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested
} from "class-validator";
import {Type} from "class-transformer";

class HighlightDto {
    @IsString()
    @IsNotEmpty()
    term: string;

    @IsString()
    @IsNotEmpty()
    definition: string;

    @IsBoolean()
    @IsNotEmpty()
    isStarred: boolean = false;
}

export default class HighlightsDto {
    @IsString()
    @IsNotEmpty()
    bookAuthor: string;

    @IsString()
    @IsNotEmpty()
    bookTitle: string;

    @IsString()
    @IsOptional()
    pageLocation?: string;

    @IsString()
    @IsOptional()
    addedDate?: string;

    @IsArray({each: true})
    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => HighlightDto)
    highlights: HighlightDto[];
}