import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "../entities/users.entity";
import {Repository} from "typeorm";

@Injectable()
export class FindOneByGoogleIdProvider {
    constructor(

        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {
    }

    public async findOneByGoogleId(googleId: string){
        return await this.usersRepository.findOneBy({googleId})
    }
}
