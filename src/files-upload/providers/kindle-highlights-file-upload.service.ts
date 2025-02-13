import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
    BadRequestException,
    ParseUUIDPipe
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UsersService} from "../../users/providers/users.service";

import KindleHighlightsFile from '../entities/kindle-highlights.file'
import {FindUserService} from "../../users/utilities/providers/find-user.services";
import {ExtractKindleHighlightsServiceUtil} from "../utilities/providers/extract-kindle-highlights-service";

@Injectable()
export class KindleHighlightsFileUploadService {
    constructor(
        @InjectRepository(KindleHighlightsFile)
        private readonly filesRepository: Repository<KindleHighlightsFile>,
        private readonly findUserService: FindUserService,
        private readonly extractKindleHighlightsService: ExtractKindleHighlightsServiceUtil
    ) {
    }

    async uploadKindleHighlights(userId: string, file: Express.Multer.File): Promise<string> {
        const doesUserExist = await this.findUserService.findUserById(userId);

        if (!doesUserExist) {
            throw new NotFoundException('User not found');
        }

        if (!file) {
            throw new BadRequestException('No file is uploaded');
        }

        const kindleFileContent = file.buffer.toString('utf8');

        // Extract notecards from the file
        const kindleHighlights = this.extractKindleHighlightsService.extractKindleHighlights(kindleFileContent);

        let userHighlights: KindleHighlightsFile;
        try {
            if(kindleHighlights){
                userHighlights = this.filesRepository.create({
                    highlights: kindleHighlights,
                    userId: doesUserExist
                })
            }

            if(userHighlights) await this.filesRepository.save(userHighlights);

            return `Highlights are imported`;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async getUserFiles(userId: string): Promise<KindleHighlightsFile[]>{
        return await this.filesRepository.find({
            where: {
            },
            select: ["highlights"]
        })
    }
}