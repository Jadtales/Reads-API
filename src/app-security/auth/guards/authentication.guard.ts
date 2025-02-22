import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthTypeEnum } from '../enums/auth-type.enum';
import { AccessTokenGuard } from './access.token.guard';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthTypeEnum.Bearer;

  // Create authTypeGuardMap
  private readonly authTypeGuardMap: Record<
    AuthTypeEnum,
    CanActivate | CanActivate[]
  >;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthTypeEnum.Bearer]: this.accessTokenGuard,
      [AuthTypeEnum.None]: { canActivate: () => true },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const usedAuthType = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    const guards = usedAuthType
      .map((type) => this.authTypeGuardMap[type])
      .flat();

    const error = new UnauthorizedException();

    for (const instance of guards) {
      const canActive = await Promise.resolve<boolean>(
        instance.canActivate(context),
      ).catch((err) => {
        err;
      });

      if (canActive) {
        return true;
      }
    }

    throw error;
  }
}
