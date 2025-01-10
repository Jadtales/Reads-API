import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UsersService } from '../../users/providers/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cards } from '../entities/cards.entity';
import { CardsQueryDTO } from '../DTOs/cards.params-queries.dto';

@Injectable()
export class CardsStatsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly UserServices: UsersService,
    // Repositories
    @InjectRepository(Cards)
    private readonly CardsRepository: Repository<Cards>,
  ) {}

  async getTotalCards(
    userId: string,
    cardsQuantity: number,
    queries: CardsQueryDTO,
  ) {
    const result = await this.CardsRepository.count({
      where: {
        cardCreatorId: {
          id: userId,
        },
      },
    });
  }
}
