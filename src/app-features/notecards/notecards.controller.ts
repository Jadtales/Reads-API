import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';

import { CardServices } from './providers/notecards.service';
import { CardCreationDTO, UpdateNotecard } from './dtos/cards.creation.dto';
import { CardsQueryDTO } from './dtos/cards.params-queries.dto';
import { ActiveUser } from '../../app-security/auth/decorators/active-user.decorator';
import { ActiveUserInterface } from '../../app-security/auth/interfaces/active-user.interface';

@Controller('notecards')
export class NotecardsController {
  constructor(private readonly cardServices: CardServices) {}

  // it fetches user's infos of user's cards
  @Get(':userId')
  getUserCards(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Query() cardsQuery: CardsQueryDTO,
  ) {
    return this.cardServices.getCards(userId, cardsQuery);
  }

  @Post('create-notecard')
  createCard(
    @ActiveUser() user: ActiveUserInterface,
    @Body() noteCardCredentials: CardCreationDTO,
  ) {
    console.log('reached controller');
    return this.cardServices.createNoteCard(noteCardCredentials, user);
  }

  @Post('delete-notecard')
  deleteNotecard(@Body() userNotecard: { userId: string; notecardId: number }) {
    return this.cardServices.deleteNotecard(
      userNotecard.userId,
      userNotecard.notecardId,
    );
  }

  // @Post('update-notecard')
  // updateNotecard(@Body() notecard: UpdateNotecard) {
  //   // return this.cardServices.updateNoteCard(notecard);
  // }
}
