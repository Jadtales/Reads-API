import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserStats } from '../entities/user-stats.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersStatsService {
  constructor(
    @InjectRepository(UserStats)
    private readonly UserStatsRepository: Repository<UserStats>,
  ) {}

  getUserStatistics(userId: string) {
    return this.UserStatsRepository.find({
      where: {
        // userCardCreatorId: userId
      },
    });
  }
}
