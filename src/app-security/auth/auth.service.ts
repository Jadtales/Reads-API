import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../app-essentials/users/providers/users.service';
import { SignInAuthDto } from './dtos/auth.dto';
import { HashingProvider } from './providers/hashing.provider';
import { GenerateTokenProvider } from './providers/generate-tokens.provider';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RefreshTokenProvider } from './providers/refresh-token.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userServices: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider: GenerateTokenProvider,
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

  public async signInUser(signInDto: SignInAuthDto) {
    const user = await this.userServices.findUserByEmailPassword(
      signInDto.email,
    );

    // compare user password to hashed password
    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.userPassword,
      );
    } catch (err) {
      throw new RequestTimeoutException(err.message, {
        description: 'Could not compare user password',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('The given password is incorrect');
    }

    const [accessToken, refreshToken] =
      await this.generateTokensProvider.generateToken(user);

    return {
      userId: user.id,
      accessToken,
      refreshToken,
    };
  }

  public async signIn_refreshToken(refreshTokenDTO: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshToken(refreshTokenDTO);
  }
}
