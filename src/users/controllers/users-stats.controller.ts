import {Controller, Get, Param, ParseUUIDPipe} from '@nestjs/common';
import {UsersStatsService} from "../providers/user-stats.services";

@Controller('users-stats')
export class UsersStatsController {
    constructor(
        private readonly usersStatsService: UsersStatsService,
    ) {
    }

    // --- Users Statistics Section
    @Get('get-user-stats/:id')
    public getUserStatistics(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersStatsService.getUserStatistics(id);
    }
}
