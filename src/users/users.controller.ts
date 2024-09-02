import {Controller, Get, Param} from '@nestjs/common'

@Controller('users')
export class UsersController{

    @Get('/:userId')
    public getUsers(@Param() params: any): string{

        if(params.userId === 'amjad'){
            return 'massaoud'
        }
        return 'no'
    }
}