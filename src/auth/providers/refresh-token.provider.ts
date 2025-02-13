import {forwardRef, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {RefreshTokenDto} from "../dtos/refresh-token.dto";
import {JwtService} from "@nestjs/jwt";
import {ConfigType} from "@nestjs/config";
import JwtConfig from "../config/jwt.config";
import {UsersService} from "../../users/providers/users.service";
import {GenerateTokenProvider} from "./generate-tokens.provider";
import {ActiveUserInterface} from "../interfaces/active-user.interface";

@Injectable()
export class RefreshTokenProvider {

    constructor(
        @Inject(JwtService)
        private readonly jwtService: JwtService,
        @Inject(JwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof JwtConfig>,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly generateTokensProvider: GenerateTokenProvider
    ) {
    }

    public async refreshToken(refreshTokenDTO: RefreshTokenDto) {
        try {
            // verify the refresh token that is sent by the user
            const {userId} = await this.jwtService.verifyAsync<Pick<ActiveUserInterface, 'userId'>>(
                refreshTokenDTO.refreshToken,
                {
                    secret: this.jwtConfiguration.secret,
                    audience: this.jwtConfiguration.audience,
                    issuer: this.jwtConfiguration.issuer,
                });

            // fetch the user from the database
            const user = await this.usersService.findUserById(userId);

            if (user) {
                // generate new token
                return await this.generateTokensProvider.generateToken(user);
            }
        } catch (err) {
            throw new UnauthorizedException(err)
        }

    }
}
