import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SharedContentResponseDTO {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  bookAuthor?: string = 'Unknown';

  @IsOptional()
  @IsString()
  bookName?: string = 'Unknown';
}
