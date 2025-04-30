import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import KindleHighlightsFile from '../entities/kindle-highlights.file';
import { FindUserService } from '../../../app-essentials/users/utilities/providers/find-user.services';
import { ExtractKindleHighlightsServiceUtil } from '../utilities/providers/extract-kindle-highlights-service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class KindleHighlightsFileUploadService {
  constructor(
    @InjectRepository(KindleHighlightsFile)
    private readonly filesRepository: Repository<KindleHighlightsFile>,
    private readonly findUserService: FindUserService,
    private readonly extractKindleHighlightsService: ExtractKindleHighlightsServiceUtil,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async uploadKindleHighlights(
    userId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const doesUserExist = await this.findUserService.findUserById(userId);

    if (!doesUserExist) {
      throw new NotFoundException('User not found');
    }

    if (!file) {
      throw new BadRequestException('No file is uploaded');
    }

    const kindleFileContent = file.buffer.toString('utf8');

    // Extract notecards from the file
    const kindleHighlights =
      this.extractKindleHighlightsService.extractKindleHighlights(
        kindleFileContent,
      );

    let userHighlights: KindleHighlightsFile;
    try {
      if (kindleHighlights) {
        userHighlights = this.filesRepository.create({
          highlights: kindleHighlights,
          userId: doesUserExist,
        });
      }

      if (userHighlights) await this.filesRepository.save(userHighlights);

      return `Highlights are imported`;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getUserFiles(userId: string): Promise<KindleHighlightsFile[]> {
    // Try to get cached data
    const cachedFiles =
      await this.cacheManager.get<KindleHighlightsFile[]>(userId);

    if (cachedFiles) {
      return cachedFiles;
    }

    let userFiles: KindleHighlightsFile[];
    try {
      userFiles = await this.filesRepository.find({
        where: { userId: { id: userId } }, // Assuming userId is stored as a string
        select: ['highlights'],
      });
    } catch (err) {
      console.error(`Error fetching user files: ${err.stack}`);
      throw new InternalServerErrorException({
        message: err.message,
        description: `Could not retrieve user files`,
      });
    }

    if (userFiles.length > 0) {
      await this.cacheManager.set(userId, userFiles, 1000);
    }

    return userFiles;
  }
}
