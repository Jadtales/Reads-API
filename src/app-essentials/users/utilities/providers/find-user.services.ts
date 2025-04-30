import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';

@Injectable()
export class FindUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findUserById(userId: string): Promise<User | undefined> {
    const doesUserExist: User | null = await this.usersRepository.findOneBy({
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

  public async findUsersById(userIds: string[]): Promise<User[] | undefined> {
    if (!userIds || userIds.length < 1) return;

    return (await this.usersRepository.find({
      where: {
        id: In(userIds),
      },
      select: ['id','userUsername'],
    }));
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    const doesUserExist: User | null = await this.usersRepository.findOneBy({
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
  ): Promise<User | undefined> {
    const doesUserExist: User | null = await this.usersRepository.findOneBy({
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
