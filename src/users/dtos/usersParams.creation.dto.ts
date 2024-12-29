import { isNumber, IsNotEmpty, isIn, IsInt } from 'class-validator';

import { Type } from 'class-transformer';
export class UsersParams {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
