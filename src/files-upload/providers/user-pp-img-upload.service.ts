import {Injectable, ParseUUIDPipe} from "@nestjs/common";
import {FindUserService} from "../../users/utilities/providers/find-user.services";

@Injectable()
export class UserProfilePictureUploadService {
    constructor(
        private readonly findUserServices: FindUserService
    ) {
    }

    async uploadUserProfilePicture(userId: string, img: Express.Multer.File): Promise<string> {
        const doesUserExists = await this.findUserServices.findUserById(userId);

        if(!doesUserExists) return;

        // todo: implement user PP upload
        return 'hello'
    }
}