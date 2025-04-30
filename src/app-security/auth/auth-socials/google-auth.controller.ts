import {Body, Controller, Post} from '@nestjs/common';
import {GoogleAuthService} from "./providers/google-auth.service";
import {GoogleAuthDto} from "./dtos/google-auth.dto";
import {AuthAccessType} from "../decorators/auth-access.type";
import {AuthTypeEnum} from "../enums/auth-type.enum";

@AuthAccessType(AuthTypeEnum.None)
@Controller('auth/google-auth')
export class GoogleAuthController {
    constructor(
        private readonly googleAuthService: GoogleAuthService,
    ) {
    }

    @Post()
    public authenticateUserByGoogle(@Body() googleAuthDto: GoogleAuthDto) {
        return this.googleAuthService.googleAuthenticate(googleAuthDto);
    }
}
