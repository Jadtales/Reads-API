import {IsNotEmpty, IsUUID} from 'class-validator';

export default class UserRelationsDTO {
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