import { CardDto } from '../../cards-management/DTOs/cards.credentials.dto';
import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsEmail,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  MinLength,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UserCreation_dto {
  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(51)
  userUsername: string;

  @IsString()
  @IsOptional()
  userFirstName?: string;

  @IsString()
  @IsOptional()
  userLastName?: string;

  @IsInt()
  @IsOptional()
  userAge?: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsStrongPassword({ minLength: 12, minNumbers: 2, minUppercase: 1 })
  userPassword: string;
}
export class UpdateUser_dto {
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Username is too short. Minimum length is 3 characters.',
  })
  @MaxLength(20, {
    message: 'Username is too long. Maximum length is 20 characters.',
  })
  userUsername?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: 'First name is too short. Minimum length is 2 characters.',
  })
  @MaxLength(30, {
    message: 'First name is too long. Maximum length is 30 characters.',
  })
  userFirstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: 'Last name is too short. Minimum length is 2 characters.',
  })
  @MaxLength(30, {
    message: 'Last name is too long. Maximum length is 30 characters.',
  })
  userLastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address format.' })
  userEmail?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, {
    message: 'Password is too short. Minimum length is 8 characters.',
  })
  @MaxLength(50, {
    message: 'Password is too long. Maximum length is 50 characters.',
  })
  userPassword?: string;

  @IsOptional()
  @IsInt({ message: 'Age must be a valid number.' })
  userAge?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'About section is too long. Maximum length is 255 characters.',
  })
  userAbout?: string;

  @IsOptional()
  @IsString()
  userAvatar?: string; // If you're allowing users to update their avatar with a URL
}
export class UserCredentialsById_Dto {
  @IsInt()
  userId: number;

  @IsBoolean()
  isUserPremium: boolean;

  @IsString()
  userUsername: string;

  @IsString()
  userName: string;

  @IsString()
  userLastname: string;

  @IsString()
  userAvatar: string;

  @IsString()
  userAbout: string;

  @IsInt()
  userFollowersQuantity: number;

  @IsInt()
  userFolloweeQuantity: number;

  @IsInt()
  userRate: number;

  @IsArray()
  @IsString({ each: true })
  userInterests: string[];

  @IsInt()
  cardsQuantity: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardDto)
  cards?: CardDto[];
}
export class UserStats_Dto {
  numberOfCreatedCards: number;
  percentageOfActiveTime: number;

  streaks: number;
  streakRanking: number;

  totalInteractions: number;
  cardsEngagementRate: number;

  /**
   * card rating in which the user rates other users cards.
   * -> Drive the total, average, lowest number out of it.
   */
  cardRating: number;
}
