import {
    ConflictException, forwardRef, Inject,
    Injectable,
    NotFoundException,
    RequestTimeoutException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Follow} from '../entities/follow.entity';
import {Users} from '../entities/user.entity';
import {Repository} from 'typeorm';
import {NotificationsService} from "../../notifications/providers/notifications.service";

@Injectable()
export class FollowFollowingRelationServices {
    constructor(
        @InjectRepository(Follow)
        private readonly followRepository: Repository<Follow>,
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        @Inject(forwardRef(() => NotificationsService))
        private readonly notificationsService: NotificationsService,
    ) {
    }

    async getFollowers(
        userId: string,
    ): Promise<{ id: string; username: string }[]> {
        const followers = await this.followRepository.find({
            where: {
                following: {
                    id: userId,
                },
            },
            relations: ['follower'], // Assuming 'follower' is the relation to the User entity
        });

        // Map to only include the id and username of the follower
        return followers.map((follow) => ({
            id: follow.follower.id,
            username: follow.follower.userUsername,
        }));
    }

    async getFollowing(userId: string): Promise<Follow[]> {
        return this.followRepository.find({
            where: {
                follower: {
                    id: userId,
                },
            },
        });
    }

    async followUser(followerId: string, followingId: string): Promise<Follow | string> {
        const follower = await this.userRepository.findOneBy({id: followerId});
        const following = await this.userRepository.findOneBy({id: followingId});

        if (!follower) {
            throw new NotFoundException('Follower not found');
        }
        if (!following) {
            throw new NotFoundException('The User to follow is not found');
        }

        if (followerId === followingId) {
            throw new ConflictException('User cannot follow itself');
        }

        const existingFollow = await this.followRepository.findOne({
            where: {follower: follower, following: following},
        });
        if (existingFollow) {
            throw new ConflictException('You are already following this user.');
        }

        let follow = undefined;
        try {
            follow = this.followRepository.create({follower, following});
            await this.followRepository.save(follow);

            // emit a notification
            await this.notificationsService.createNotification(follower.id, following.id, {
                createdAt: Date.now(),
                notificationType: 'followed',
                notificationContent: `${follower.userUsername} has followed you.`
            });

            return `${follower.userUsername} follows ${following.userUsername}`
        } catch (err) {
            throw new RequestTimeoutException(err)
        }
    }

    async unfollowUser(userId: string, toUnfollow: string): Promise<string> {
        const followerId = await this.userRepository.findOneBy({id: userId});
        const followingId = await this.userRepository.findOneBy({id: toUnfollow});

        if (!followerId) {
            throw new NotFoundException('Follower not found');
        }
        if (!followingId) {
            throw new NotFoundException('The User to unfollow is not found');
        }

        if (followerId === followingId) {
            throw new ConflictException('User cannot unfollow itself');
        }

        const deleteResult = await this.followRepository.delete({
            follower: {id: userId},
            following: {id: toUnfollow},
        });

        // check if any record is affected
        if (deleteResult.affected === 0) {
            throw new NotFoundException('Follow-Following relation is not found')
        }

        return `${followerId.userUsername} unfollowed ${followingId.userUsername}`
    }
}
