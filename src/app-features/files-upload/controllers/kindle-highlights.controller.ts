import { Controller, Get } from '@nestjs/common';
import { KindleBooksServices } from '../providers/kindle-books.service';

@Controller()
export class KindleHighlightsController {
  constructor(
    private readonly kindleHighlightsServices: KindleBooksServices,
  ) {}

}
