import {IsNotEmpty, IsUUID} from 'class-validator';

export default class FollowFollowingRelationDTO {
    @IsUUID()
    @IsNotEmpty()
    followerId: string;

    @IsNotEmpty()
    @IsUUID()
    followingId: string;
}


export class UnfollowFollowingRelationDTO {
    @IsUUID()
    @IsNotEmpty()
    followerId: string;

    @IsNotEmpty()
    @IsUUID()
    followingId: string;
}