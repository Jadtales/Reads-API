import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    ParseUUIDPipe,
    Post,
    Query,
    Req,
} from '@nestjs/common';

import {CardServices} from './providers/notecards.service';
import {CardCreationDTO} from './dtos/cards.creation.dto';
import {CardsQueryDTO} from './dtos/cards.params-queries.dto';
import {ActiveUser} from '../auth/decorators/active-user.decorator';
import {ActiveUserInterface} from '../auth/interfaces/active-user.interface';

@Controller('cards')
export class NotecardsController {
    constructor(private readonly cardServices: CardServices) {
    }

    // it fetches user's infos of user's cards
    @Get(':userId')
    getUserCards(
        @Param('userId', new ParseUUIDPipe()) userId: string,
        @Query() cardsQuery: CardsQueryDTO,
    ) {
        return this.cardServices.getCards(userId, cardsQuery);
    }

    @Post(':createNoteCard')
    createCard(
        @ActiveUser() user: ActiveUserInterface,
        @Body() noteCardCredentials: CardCreationDTO,
    ) {
        return this.cardServices.createNoteCard(noteCardCredentials, user);
    }
}
