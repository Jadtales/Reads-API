import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import {GenerateTokenProvider} from "./providers/generate-tokens.provider";
import { RefreshTokenProvider } from './providers/refresh-token.provider';
import { GoogleAuthController } from './auth-socials/google-auth.controller';
import { GoogleAuthService } from './auth-socials/providers/google-auth.service';
import { FindOneByGoogleIdProvider } from '../users/providers/find-one-by-google-id.provider';

@Module({
  controllers: [AuthController, GoogleAuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    GenerateTokenProvider,
    RefreshTokenProvider,
    GoogleAuthService,
  ],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
