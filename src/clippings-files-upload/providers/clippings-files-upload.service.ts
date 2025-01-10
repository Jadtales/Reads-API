import {Injectable, NotFoundException, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UsersService} from "../../users/providers/users.service";

import UploadKindleFile from '../entities/uploadFile.entity'

@Injectable()
export class ClippingsFilesUploadService {
    constructor(
        @InjectRepository(UploadKindleFile)
        private readonly FilesRepository: Repository<UploadKindleFile>,
        private readonly usersService: UsersService,
    ) {
    }

    async addKindleClippings(userId: string, file: Express.Multer.File): Promise<string> {
        const doesUserExist = await this.usersService.findUserById(userId);

        if (!doesUserExist) {
            throw new NotFoundException('User not found');
        }

        // Extract notecards from the file (implement this function)
        const notecards = this.extractNotecardsFromFile(file);

        try {
            const newFileEntry = this.FilesRepository.create({
                userId: doesUserExist, // Assuming findUserById returns a User entity
                extractedNotecardsFromFiles: {
                    data: notecards,
                },
            });

            await this.FilesRepository.save(newFileEntry);
            return 'Kindle clippings added successfully';
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    private extractNotecardsFromFile(file: Express.Multer.File): any[] {
        // Implement logic to parse the file and extract notecards
        // This is a placeholder, replace with actual implementation
        return [
            {
                term: 'Sample Term',
                definition: 'Sample Definition',
                isStared: false,
            },
        ];
    }
}