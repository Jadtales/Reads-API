import {
    Body, ConflictException,
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import {EventEmitter2} from '@nestjs/event-emitter';

import {UsersService} from '../../users/providers/users.service';
import {Cards} from '../entities/cards.entity';

// imported DTOs
import {CardCreationDTO, CardDataDto} from '../DTOs/cards.creation.dto';
import {CardsQueryDTO} from '../DTOs/cards.params-queries.dto';

import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Between, MoreThanOrEqual, LessThanOrEqual, Like} from 'typeorm';
import {PaginationProvider} from '../../common/pagination/providers/pagination.provider';
import {PaginationInterface} from '../../common/interfaces/pagination.interface';
import {ActiveUserInterface} from '../../auth/interfaces/active-user.interface';
import {NotificationsService} from "../../notifications/providers/notifications.service";

@Injectable()
export class CardServices {
    constructor(
        @Inject(() => NotificationsService)
        private readonly notificationsService: NotificationsService,
        @Inject(forwardRef(() => UsersService))
        private readonly UserServices: UsersService,
        @InjectRepository(Cards)
        private readonly cardsRepository: Repository<Cards>,
        private readonly paginationProvider: PaginationProvider,
    ) {
    }

    async getNumberOfCards(userId: string): Promise<number> {
        const result = await this.cardsRepository
            .createQueryBuilder('card')
            .select('jsonb_array_length(cards.cardData)', 'length')
            .where('card.userId = :userId', {userId})
            .getRawOne();

        return result?.length || 0;
    }

    async createNoteCard(
        createNoteCard: CardCreationDTO,
        userPermission: ActiveUserInterface,
    ) {

        // check if user exists first
        let userExists = undefined;
        try {

            userExists = await this.UserServices.findUserById(
                userPermission.userId,
            );
        } catch (err) {
            throw new ConflictException(err);
        }

        try {
            const noteCard = this.cardsRepository.create({
                ...createNoteCard,
                cardCreatorId: userExists,
            });

            await this.cardsRepository.save(noteCard);
        }catch (err){
            throw new InternalServerErrorException('Notecard isn\'t created', err);
        }

        await this.notificationsService.createNotification(userPermission.userId)

    }

    async getCards(
        userId: string,
        cardsQuerying: CardsQueryDTO,
    ): Promise<PaginationInterface<Cards>> {
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
            order = {cardLikes: 'desc'};
        } else if (sortBy === 'views') {
            order = {viewCount: 'desc'};
        } else {
            order = {cardCreationDate: 'asc'}; // Default sort order
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
            return await this.paginationProvider.paginateQuery<Cards>(
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

    async updateNoteCard(cardId: CardDataDto) {
    }

    async removeNoteCard(cardId: CardDataDto) {
    }
}
