import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';

import { DateUtils } from '../../common/utils/methods-utils';

import { GetBookByIdTypeDto } from './dtos/returned-type-dtos/get-book-by-id.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetRatingRequestDto } from './dtos/route-dtos/get-rating-queries.dto';
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async getBookById(id: number): Promise<GetBookByIdTypeDto> {
    return this.booksRepository.findOneBy({
      id: id,
    });
  }

  async getBooksRating(ratingStructure: GetRatingRequestDto) {
    const { rating, quantity, timing, sinceDate, ratedBy } = ratingStructure;
    const { weeks, month, year } = sinceDate;

    const whereClause: Record<string, any> = {
      ...(ratedBy === 'community' && { bookRating: rating }),
      ...(ratedBy === 'reanotes' && { bookReanotesRating: rating }),
    };

    if (weeks || month || year) {
      const offsetDate = DateUtils.getDateOffset({ weeks, month, year });
      whereClause.lastUpdate = DateUtils.getDateOn(offsetDate, timing);
    }

    if (quantity === 'one') {
      return await this.booksRepository.findOne({
        where: whereClause,
        order: { lastUpdate: timing === 'latest' ? 'DESC' : 'ASC' },
      });
    }

    return await this.paginationProvider.paginateQuery<Book>(
      {
        limit: 10,
        page: 1,
      },
      this.booksRepository,
      { lastUpdate: timing === 'latest' ? 'DESC' : 'ASC' },
      whereClause,
    );
  }
}
