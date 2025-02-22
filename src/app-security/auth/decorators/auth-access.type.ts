import { SetMetadata } from '@nestjs/common';
import { AuthTypeEnum } from '../enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';

export const AuthAccessType = (...authTypes: AuthTypeEnum[]) => {
  return SetMetadata(AUTH_TYPE_KEY, authTypes);
};
