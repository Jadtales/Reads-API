import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignInAuthDto} from './dtos/auth.dto';
import {AuthAccessType} from './decorators/auth-access.type';
import {AuthTypeEnum} from './enums/auth-type.enum';
import {RefreshTokenDto} from "./dtos/refresh-token.dto";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @AuthAccessType(AuthTypeEnum.None)
    public signIn(@Body() signInUser: SignInAuthDto) {
        return this.authService.signInUser(signInUser);
    }

    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    @AuthAccessType(AuthTypeEnum.None)
    public signInWithRefreshToken(@Body() refreshTokenDTO: RefreshTokenDto) {
        return this.authService.signIn_refreshToken(refreshTokenDTO)
    }
}
