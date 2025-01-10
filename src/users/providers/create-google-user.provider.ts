import {ConflictException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "../entities/user.entity";
import {Repository} from "typeorm";
import {CreateGoogleUserInterface} from "../interfaces/create-google-user.interface";

@Injectable()
export class CreateGoogleUser {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) {
    }

    public async createGoogleUser(googleUser: CreateGoogleUserInterface) {
        try {
            const user = this.usersRepository.create(googleUser);
            return await this.usersRepository.save(user);
        } catch (error) {
            throw new ConflictException(error, {
                description: "Failed to create Google User",
            })
        }
    }
}