import {PartialType} from "@nestjs/mapped-types";

import {
    validate,
    validateOrReject,
    Contains,
    IsString,
    IsInt,
    Length,
    IsEmail,
    Min,
    Max,
    IsNotEmpty, IsOptional, IsStrongPassword, MinLength
} from 'class-validator';


export class PostUserCreation_dto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    userUsername: string;

    @IsString()
    @IsOptional()
    userFirstName?: string;

    @IsString()
    @IsOptional()
    userLastName?: string;

    @IsInt()
    @IsOptional()
    userAge?: number

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({minLength: 12, minNumbers: 2, minUppercase: 1})
    userPassword: string;
}

export class PatchUserCreation_dto extends PartialType(PostUserCreation_dto) {}