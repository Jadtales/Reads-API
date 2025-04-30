import {IsNotEmpty, IsString, IsInt} from 'class-validator'

export class PostSharedContentQuerytDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsInt()
  contentId: number;
}