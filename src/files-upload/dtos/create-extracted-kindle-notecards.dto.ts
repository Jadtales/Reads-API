import {IsNotEmpty, IsString, IsUUID} from "class-validator";

export default class CreateExtractedKindleNotecards{
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;


}