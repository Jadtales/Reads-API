import {forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import HighlightsDto from "../dtos/highlights.dto";
import {InjectRepository} from "@nestjs/typeorm";

import UploadKindleFile from "../entities/uploadFile.entity";
import {UsersService} from "../../users/providers/users.service";
import {Users} from "../../users/entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export default class UploadExtractedHighlightsService {

    constructor(
        @InjectRepository(UploadKindleFile)
        private uploadKindleFile: Repository<UploadKindleFile>,
        // imported external services
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService
    ) {
    }


    async uploadUserHighlights(userId: string, highlights: HighlightsDto): Promise<string> {
        // check user existance
        const userExist = await this.usersService.findUserById(userId);

        if (!userExist) {
            throw new NotFoundException("User does not exist!");
        }

        // Create and save the Kindle file
        try {
            const kindleFile = this.uploadKindleFile.create({
                userId: userExist,
                extractedHighlightsFromFile: highlights,
            });

            await this.uploadKindleFile.save(kindleFile);
            return 'Highlights uploaded successfully.';
        } catch (error) {
            throw new InternalServerErrorException('Failed to upload highlights.', error);
        }
    }

}