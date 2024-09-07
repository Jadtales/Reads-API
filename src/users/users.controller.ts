import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Query,
    Body,
    ParseIntPipe,
    DefaultValuePipe,
    ValidationPipe
} from '@nestjs/common'

import {PostUserCreation_dto} from "./dtos/users.ceeation.dto";
import {PatchUserCreation_dto} from "./dtos/users.ceeation.dto";

@Controller('users')
export class UsersController {
    // ---- GET functionalities implementation

    // to retrieve the user id
    @Get('/:userId')
    public getUser(@Param('userId', ParseIntPipe) userid: number | undefined, @Query() queries: any): string {


        if (userid === 2) {
            return 'massaoud';
        }

        // after checking the user id in the db, return the user id
        return 'no';
    }


    // Fetch notes for a user with a limit on the number of books
    @Get('/:userId/:userNotes?')
    public getUsersNotes(
        @Param('userId', ParseIntPipe) userid: number | undefined,
        @Param('userNotes', new DefaultValuePipe(10)) userNotes: string | undefined):
        Record<string, string | number> | string {

        if (userid === 2 && userNotes === 'aliens') {
            return {
                whoRequested: userid,
                userNotes: 'Alien lives'
            }
        }
        ``

        return 'not found'
    }


    // ---- POST functionalities implementation

    @Post()
    public createUsers(@Body() postedUserCreation_dto: PostUserCreation_dto): string {


        return 'User credentials aren\'t detected';
    }


    // ---- PATCH functionalities implementation

    // change user credentials as requested by the user
    @Patch('/:userId')
    public updateUserCredentials(
        @Param('userId', ParseIntPipe) userId: string | undefined,
        @Body() patchedUserCreation_dto: PatchUserCreation_dto,
    ) {
        return patchedUserCreation_dto
    }
}