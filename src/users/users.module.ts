import { Module } from '@nestjs/common';

// imported providers
import {UsersController} from "./users.controller";

@Module({
    controllers: [UsersController]
})
export class UsersModule{

}