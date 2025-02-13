import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import JwtConfig from '../config/jwt.config';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    // inject jwtService
    private readonly jwtService: JwtService,
    // inject jwt configuration
    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // extract the request
    const request = context.switchToHttp().getRequest();

    // extract the token
    const token = this.extractRequestFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request[REQUEST_USER_KEY] = await this.jwtService.verifyAsync(
        token,
        this.jwtConfig,
      );
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractRequestFromHeader(request: Request): string | undefined {
    const [, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
