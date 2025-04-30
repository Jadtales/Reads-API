import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notecards } from '../notecards/entities/notecards';
import { User } from '../../app-essentials/users/entities/users.entity';
import KindleHighlightsFile from '../files-upload/entities/kindle-highlights.file';
import { SharedContentResponseDTO } from './dto/get-shared-content.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class SharedContentService {
  constructor(
    // TODO implement notes content sharing as well
    @InjectRepository(KindleHighlightsFile)
    private readonly KindleFilesRepository: Repository<KindleHighlightsFile>,
    @InjectRepository(Notecards)
    private readonly notecardsRepository: Repository<Notecards>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async getSharedContent(
    username: string,
    contentId: number,
  ): Promise<SharedContentResponseDTO> {
    const isContentCached: SharedContentResponseDTO =
      await this.cacheManager.get<SharedContentResponseDTO>(
        `shared-content-${username}-${contentId}`,
      );

    if (isContentCached) {
      return isContentCached;
    }

    // check if user exists
    const userExists: User = await this.userRepository.findOneBy({
      userUsername: username,
    });

    // check if notecard exists
    const notecard = await this.notecardsRepository
      .createQueryBuilder('notecard')
      .where('notecard.notecardCreatorId = :creatorId', {
        creatorId: userExists.id,
      })
      .andWhere(
        `
        EXISTS (
          SELECT 1 FROM jsonb_array_elements(notecard.notecardData) elem
          WHERE (elem->>'id')::int = :targetId
        )
      `,
        {
          targetId: contentId,
        },
      )
      .andWhere('notecard.isPublished = true')
      .getOne();

    if (!userExists || !notecard) {
      throw new NotFoundException('User/Content not found');
    }

    const sharedContent = notecard.notecardData?.find(
      (item) => item.id === contentId,
    );

    try {
      if (sharedContent) {
        await this.cacheManager.set(`shared-content-${username}-${contentId}`, {
          username: userExists.userUsername,
          content: sharedContent,
        });

        return {
          username: userExists.userUsername,
          content: sharedContent.definition,
        };
      }
    } catch {
      throw new NotFoundException('User/Content Not Found');
    }
  }
}
