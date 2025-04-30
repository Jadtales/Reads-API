import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import KindleHighlightsFile from '../entities/kindle-highlights.file';
import { Repository } from 'typeorm';

@Injectable()
export class KindleBooksServices {
  constructor(
    @InjectRepository(KindleHighlightsFile)
    private readonly KindleHighlightsFileRepository: Repository<KindleHighlightsFile>,
  ) {}

  async getBookCredentialsBy(getBy: GetBookBy): Promise<KindleHighlightsFile> {
    const query =
      this.KindleHighlightsFileRepository.createQueryBuilder('file');

    if (getBy === 'bookAuthor') {
      return query
        .andWhere(
          `
        EXISTS (
          SELECT 1 FROM jsonb_array_elements(file.highlights->'highlights') elem
          WHERE elem->>'bookAuthor' = :value
        )
      `,
          { getBy },
        )
        .getOne();
    } else if (getBy === 'bookTitle') {
      return query
        .andWhere(
          `
        EXISTS (
          SELECT 1 FROM jsonb_array_elements(file.highlights->'highlights') elem
          WHERE elem->>'bookTitle' = :value
        )
      `,
          { getBy },
        )
        .getOne();
    } else if (getBy === 'bookId') {
      return query
        .andWhere(
          `
        EXISTS (
          SELECT 1 FROM jsonb_array_elements(file.highlights->'highlights') elem
          WHERE elem->>'bookId' = :value
        )
      `,
          { getBy },
        )
        .getOne();
    }
  }
}
