import { UserCreation_dto } from '../../../app-essentials/users/dtos/user.dtos';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignInAuthDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  // @IsNotEmpty()
  // @IsStrongPassword()
  password: string;
}

export class SignUpAuthDTO extends UserCreation_dto {}
