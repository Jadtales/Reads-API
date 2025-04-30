import {Inject, Injectable} from "@nestjs/common";
import JwtConfig from "../config/jwt.config";
import {ConfigType} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";
import {User} from "../../../app-essentials/users/entities/users.entity";
import {ActiveUserInterface} from "../interfaces/active-user.interface";

@Injectable()
export class GenerateTokenProvider {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(JwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof JwtConfig>,
    ) {
    }

    public async signToken<Type>(userId: string, expiresIn: number, payload?: Type): Promise<string> {
        return await this.jwtService.signAsync({
                userId,
                ...payload
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            }
        )
    }

    public async generateToken(user: User): Promise<[string, string]> {
        // generate the access token
        let accessToken = this.signToken<Partial<ActiveUserInterface>>(
            user.id,
            this.jwtConfiguration.accessTokenTTL,
            {userEmail: user.userEmail}
        )

        // generating a refresh token
        let refreshToken = this.signToken(user.id, this.jwtConfiguration.accessTokenTTL)

        return await Promise.all([accessToken, refreshToken])
    }
}