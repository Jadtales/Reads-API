import {Injectable, NotFoundException, ParseUUIDPipe} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Users} from "../../entities/users.entity";

@Injectable()
export class FindUserService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) {
    }

    public async findUserById(userId: string): Promise<Users | undefined> {
        const doesUserExist: Users | null = await this.usersRepository.findOneBy({
            id: userId,
        });

        try {
            if (doesUserExist) {
                return doesUserExist;
            }
        } catch (error) {
            throw new NotFoundException(`Not found`, {
                cause: error,
                description: `User with ID ${userId} is not found.`,
            });
        }
    }

    public async findUserByEmail(email: string): Promise<Users | undefined> {
        const doesUserExist: Users | null = await this.usersRepository.findOneBy({
            userEmail: email,
        });

        try {
            if (doesUserExist) {
                return doesUserExist;
            }
        } catch (error) {
            throw new NotFoundException(`Not found`, {
                cause: error,
                description: `User with Email ${email} is not found.`,
            });
        }
    }

    public async findUserByUsername(
        username: string,
    ): Promise<Users | undefined> {
        const doesUserExist: Users | null = await this.usersRepository.findOneBy({
            userUsername: username,
        });

        try {
            if (doesUserExist) {
                return doesUserExist;
            }
        } catch (error) {
            throw new NotFoundException(`Not found`, {
                cause: error,
                description: `User with Username ${username} is not found.`,
            });
        }
    }
}
