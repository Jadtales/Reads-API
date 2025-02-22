import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider extends HashingProvider {
  async hashPassword(password: string | Buffer): Promise<string> {
    const saltPassword = await bcrypt.genSalt();
    return await bcrypt.hash(password, saltPassword);
  }

  async comparePassword(
    enteredUserPassword: string | Buffer,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredUserPassword, encryptedPassword);
  }
}
