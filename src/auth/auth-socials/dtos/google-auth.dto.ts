import {IsNotEmpty, IsString} from "class-validator";

export class GoogleAuthDto {
    @IsString()
    @IsNotEmpty()
    googleLoginTicket: string;
}