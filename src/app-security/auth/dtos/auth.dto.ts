import { UserCreation_dto } from '../../../app-essentials/users/dtos/user.dtos';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpAuthDTO extends UserCreation_dto {}
