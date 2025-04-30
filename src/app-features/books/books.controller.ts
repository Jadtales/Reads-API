import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { GetBookByIdResponseDto } from './dtos/returned-type-dtos/get-book-by-id.dto';
import { AuthAccessType } from '../../app-security/auth/decorators/auth-access.type';
import { AuthTypeEnum } from '../../app-security/auth/enums/auth-type.enum';
import { GetRatingRequestDto } from './dtos/route-dtos/get-rating-queries.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get(':id')
  @AuthAccessType(AuthTypeEnum.None)
  getBook(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<GetBookByIdResponseDto> {
    return this.booksService.getBookById(id);
  }

  @Get('rating')
  @AuthAccessType(AuthTypeEnum.None)
  getRating(@Body() ratingStructure: GetRatingRequestDto) {
    return this.booksService.getBooksRating(ratingStructure);
  }
}
