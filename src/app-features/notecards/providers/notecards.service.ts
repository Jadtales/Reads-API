import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from '../../../app-essentials/users/providers/users.service';
import { Notecards } from '../entities/notecards';

// imported dtos
import {
  CardCreationDTO,
  UpdateNotecard,
} from '../dtos/cards.creation.dto';
import { CardsQueryDTO } from '../dtos/cards.params-queries.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThanOrEqual, LessThanOrEqual, Like } from 'typeorm';
import { PaginationProvider } from '../../../common/pagination/providers/pagination.provider';
import { PaginationInterface } from '../../../common/interfaces/pagination.interface';
import { ActiveUserInterface } from '../../../app-security/auth/interfaces/active-user.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotecardCreationEvent } from '../../../app-utils/custom-events/notecard-events';

@Injectable()
export class CardServices {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly UserServices: UsersService,
    @InjectRepository(Notecards)
    private readonly cardsRepository: Repository<Notecards>,
    private readonly paginationProvider: PaginationProvider,
    private eventEmitter: EventEmitter2,
  ) {}

  async getNumberOfCards(userId: string): Promise<number> {
    const result = await this.cardsRepository
      .createQueryBuilder('card')
      .select('jsonb_array_length(cards.cardData)', 'length')
      .where('card.userId = :userId', { userId })
      .getRawOne();

    return result?.length || 0;
  }

  async createNoteCard(
    createNoteCard: CardCreationDTO,
    userPermission: ActiveUserInterface,
  ): Promise<string> {
    // check if user exists first
    let userExists = undefined;
    try {
      userExists = await this.UserServices.findUserById(userPermission.userId);
    } catch (err) {
      throw new ConflictException(err);
    }

    try {
      const noteCard = this.cardsRepository.create({
        ...createNoteCard,
        cardCreatorId: userExists,
      });

      await this.cardsRepository.save(noteCard);

      const isEmitted: boolean = this.eventEmitter.emit(
        'notecard.created',
        new NotecardCreationEvent(
          userExists.id,
          userExists.userUsername,
          noteCard.cardId,
          noteCard.cardTitle,
        ),
      );

      console.log('is emitted true', isEmitted);

      if (isEmitted) return `${noteCard.cardId}`;
    } catch (err) {
      throw new InternalServerErrorException("Notecard isn't created", err);
    }
  }

  async getCards(
    userId: string,
    cardsQuerying: CardsQueryDTO,
  ): Promise<PaginationInterface<Notecards>> {
    const {
      limit,
      page,
      sortBy,
      minRating,
      minLikes,
      fromDate,
      toDate,
      filterByTag,
    } = cardsQuerying;

    // Check if the user exists
    const doesUserExist = await this.UserServices.findUserById(userId);
    if (!doesUserExist) {
      throw new NotFoundException(`User with ID ${userId} was not found`);
    }

    // Determine sorting options
    let order: any = {};
    if (sortBy === 'likes') {
      order = { cardLikes: 'desc' };
    } else if (sortBy === 'views') {
      order = { viewCount: 'desc' };
    } else {
      order = { cardCreationDate: 'asc' }; // Default sort order
    }

    // Construct the 'where' conditions dynamically
    const where: any = {};
    if (minRating) {
      where.cardRating = minRating;
    }

    if (minLikes) {
      where.cardLikes = minLikes;
    }

    if (fromDate && toDate) {
      where.cardCreationDate = Between(new Date(fromDate), new Date(toDate));
    } else if (fromDate) {
      where.cardCreationDate = MoreThanOrEqual(new Date(fromDate));
    } else if (toDate) {
      where.cardCreationDate = LessThanOrEqual(new Date(toDate));
    }

    if (filterByTag) {
      where.cardTags = Like(`%${filterByTag}%`);
    }

    try {
      // Perform the query with pagination, sorting, and filtering
      return await this.paginationProvider.paginateQuery<Notecards>(
        {
          limit,
          page,
        },
        this.cardsRepository,
        order,
        where,
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occurred while fetching cards',
        {
          cause: err,
        },
      );
    }
  }

  async updateNoteCard(notecard: UpdateNotecard): Promise<string> {
    const userExists = await this.UserServices.findUserById(
      notecard.cardCreatorId,
    );
    const userNotecard = await this.cardsRepository.findOne({
      where: {
        cardId: notecard.cardId,
        cardCreatorId: userExists,
      },
    });

    const { cardCreatorId, ...updateFields } = notecard;

    let updatedNotecard = undefined;
    try {
      if (userExists && userNotecard) {
        updatedNotecard = await this.cardsRepository.merge(
          userNotecard,
          updateFields,
        );
      }

      await this.cardsRepository.save(updatedNotecard);

      return updatedNotecard;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating notecard',
        error,
      );
    }
  }

  async deleteNotecard(userId: string, notecardId: number): Promise<string> {
    const userExists = await this.UserServices.findUserById(userId);

    try {
      if (userExists) {
        await this.cardsRepository.delete({
          cardId: notecardId,
        });
      }

      return `${notecardId} is deleted`;
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occurred while deleting notecard',
        err,
      );
    }
  }
}
