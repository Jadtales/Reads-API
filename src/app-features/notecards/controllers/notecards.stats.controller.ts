import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';

import { NotecardsStatsService } from '../providers/notecards.stats.service';
import { CardsQueryDTO } from '../dtos/cards.params-queries.dto';

@Controller('cardsStats')
export class NotecardsStatsController {
  constructor(private readonly cardStatsServices: NotecardsStatsService) {}

  @Get(':getUserCardStats:userId/:')
  getUserCardsStats(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Query('cardsQuantity', new DefaultValuePipe(10), ParseIntPipe)
    cardsQuantity: number,
    @Query('typeOfStat') typeOfStat: CardsQueryDTO,
  ) {
    return this.cardStatsServices.getTotalCards(
      userId,
      cardsQuantity,
      typeOfStat,
    );
  }
}
