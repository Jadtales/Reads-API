import {forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException} from '@nestjs/common';
import {OAuth2Client} from "google-auth-library";
import jwtConfig from "../../config/jwt.config";
import {ConfigType} from "@nestjs/config";
import {GoogleAuthDto} from "../dtos/google-auth.dto";
import {UsersService} from "../../../../app-essentials/users/providers/users.service";
import {GenerateTokenProvider} from "../../providers/generate-tokens.provider";

@Injectable()
export class GoogleAuthService implements OnModuleInit {
    private googleOAuthClient: OAuth2Client

    constructor(
        @Inject(forwardRef(() => jwtConfig.KEY))
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly generateTokensProvider: GenerateTokenProvider,
    ) {
    }

    onModuleInit(): any {
        const googleClientId = this.jwtConfiguration.googleClientId;
        const googleClientSecret = this.jwtConfiguration.googleClientSecret;

        this.googleOAuthClient = new OAuth2Client(googleClientId, googleClientSecret);
    }

    public async googleAuthenticate(googleAuthDto: GoogleAuthDto) {
        try {
            console.log('received token from to the backend')
            // verify Google token sent by the user
            const loginTicket = await this.googleOAuthClient.verifyIdToken({
                idToken: googleAuthDto.googleLoginTicket
            })
            console.log(loginTicket)

            // extract the payload from Google JWT
            const {email, sub: googleId, given_name, name, picture, exp} = loginTicket.getPayload();

            // find user in the db using googleId
            const foundUser = await this.usersService.findOneByGoogleId(googleId);

            // generate a token if user exists
            if (foundUser) {
                return this.generateTokensProvider.generateToken(foundUser);
            }

            // if user doesn't exist, create a new user
            const newUser = await this.usersService.createGoogleUser({
                googleId: googleId,
                email: email,
                firstName: name,
                lastName: given_name
            });

            return this.generateTokensProvider.generateToken(newUser);

        } catch (error) {
            throw new UnauthorizedException(error)
        }

    }
}
