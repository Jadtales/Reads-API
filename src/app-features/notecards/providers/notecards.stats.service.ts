import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UsersService } from '../../../app-essentials/users/providers/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notecards } from '../entities/notecards';
import { CardsQueryDTO } from '../dtos/cards.params-queries.dto';

@Injectable()
export class NotecardsStatsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly UserServices: UsersService,
    // Repositories
    @InjectRepository(Notecards)
    private readonly CardsRepository: Repository<Notecards>,
  ) {}

  async getTotalCards(
    userId: string,
    cardsQuantity: number,
    queries: CardsQueryDTO,
  ) {
    const result = await this.CardsRepository.count({
      where: {
        notecardCreatorId: {
          id: userId,
        },
      },
    });
  }
}
