import {
    BadRequestException,
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    RequestTimeoutException,
} from '@nestjs/common';

import {CardServices} from '../../notecards/providers/notecards.service';
import {Users} from '../entities/users.entity';

import {Repository, DataSource} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

import {UpdateUser_dto, UserCreation_dto} from '../dtos/user.dtos';
import {HashingProvider} from '../../auth/providers/hashing.provider';
import {FindOneByGoogleIdProvider} from "./find-one-by-google-id.provider";
import {CreateGoogleUser} from "./create-google-user.provider";
import {CreateGoogleUserInterface} from "../interfaces/create-google-user.interface";

@Injectable()
export class UsersService {
    constructor(
        @Inject(forwardRef(() => CardServices))
        private readonly cardServices: CardServices,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProviderService: HashingProvider,
        private readonly dataSource: DataSource,
        private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
        private readonly createGoogleUserProvider: CreateGoogleUser
    ) {
    }

    async create_user(userCredentials: UserCreation_dto) {
        // check if user already exists with the same email
        const doesUserExist = await this.usersRepository.findOne({
            where: {
                userEmail: userCredentials.userEmail,
                id: userCredentials.userId,
            },
        });

        let newUser: Users;
        if (!doesUserExist) {
            newUser = this.usersRepository.create({
                ...userCredentials,
                userPassword: await this.hashingProviderService.hashPassword(
                    userCredentials.userPassword,
                ),
            });
        } else {
            throw new ConflictException('User already exists');
        }

        try {
            await this.usersRepository.save(newUser);
            return newUser;
        } catch (err) {
            throw new RequestTimeoutException('Unable to process your request.', {
                description: 'Error connecting to the database',
                cause: err,
            });
        }
    }

    async createGoogleUser(googleUser: CreateGoogleUserInterface) {
        return await this.createGoogleUserProvider.createGoogleUser(googleUser)
    }

    async createManyUsers(users: UserCreation_dto[]) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        // Transaction Operations
        const newUsers: Users[] = [];

        try {
            for (const user of users) {
                const newUser = queryRunner.manager.create(Users, user);
                const result = await queryRunner.manager.save(newUser);
                newUsers.push(result);
            }

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    async findUserById(userId: string): Promise<Users> {
        let user = undefined;

        try {
            user = await this.usersRepository.findOneBy({
                id: userId,
            });
        } catch (err) {
            throw new RequestTimeoutException('Unable to process your request.', {
                description: 'Error connecting to the database',
                cause: err,
            });
        }

        if (!user) {
            throw new BadRequestException(`with given user ID:${userId}. not found`);
        }

        return user;
    }

    async findUserByEmailPassword(userEmail: string): Promise<Users> {
        let user: Users;
        try {
            user = await this.usersRepository.findOneBy({
                userEmail: userEmail,
            });
        } catch (err) {
            throw new RequestTimeoutException('Could not fetch user', err.message);
        }

        if (user) {
            return user;
        } else {
            throw new NotFoundException('User not found');
        }
    }

    public async findOneByGoogleId(googleId: string) {
        return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
    }

    async getUserCredentialsById(userId: string) {
        if (userId) {
            return {
                userId,
                userCardsCredentials: this.cardServices.getNumberOfCards(userId),
            };
        } else {
            return new Error('None of the arguments are provided');
        }
    }

    async deleteUser(userId: string) {

    }

    async updateUser(userId: string, userCredentials: UpdateUser_dto) {
        try {
            const updateResult = await this.usersRepository.update(
                userId,
                userCredentials,
            );

            // --- Handle constraints
            if (updateResult.affected === 0) {
                throw new NotFoundException(`User with ${userId} was not found`);
            }

            return `${updateResult.affected} change has commited.`;
        } catch (err) {
            throw new InternalServerErrorException(
                'Failed to update user credentials.',
                {
                    description: 'Error updating the user in the database',
                    cause: err,
                },
            );
        }
    }
}
