import {Body, Controller, Get, Param, ParseUUIDPipe, Post} from '@nestjs/common';
import UserRelationsDTO, {UnfollowFollowingRelationDTO} from "../dtos/user-relations.dto";
import {UserRelationsServices} from "../providers/user-relations.service";

@Controller('users')
export class UserRelationsController {
    constructor(
        private readonly followFollowingRelationService: UserRelationsServices,
    ) {
    }

    // --- Follow-Following relation Section
    @Get('get-user-followers/:id')
    public getUserFollowers(@Param('id', ParseUUIDPipe) id: string) {
        return this.followFollowingRelationService.getFollowers(id);
    }

    @Get('get-user-following/:id')
    public getUserFollowings(@Param('id', ParseUUIDPipe) id: string) {
        return this.followFollowingRelationService.getFollowing(id);
    }

    @Post('follow')
    public followUser(@Body() followDto: UserRelationsDTO) {
        return this.followFollowingRelationService.followUser(
            followDto.followerId,
            followDto.followingId,
        );
    }

    @Post('unfollow')
    public unfollowUser(@Body() unfollowDto: UnfollowFollowingRelationDTO) {
        return this.followFollowingRelationService.unfollowUser(unfollowDto.followerId, unfollowDto.followingId);
    }
}
