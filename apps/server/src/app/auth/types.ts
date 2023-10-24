import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsJWT,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
export const DEFAULT_PASSWORD_MIN_LENGTH = 6;
export const DEFAULT_PASSWORD_MAX_LENGTH = 24;
export const USER_DEFAULT_STATUS = 1;
export class LoginDto {
  @ApiProperty()
  user: string;

  @ApiProperty()
  @MinLength(DEFAULT_PASSWORD_MIN_LENGTH)
  @MaxLength(DEFAULT_PASSWORD_MAX_LENGTH)
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  remember: boolean;
}

export class LoginFirebaseDto {
  @ApiProperty()
  @IsJWT()
  token: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @MinLength(DEFAULT_PASSWORD_MIN_LENGTH)
  @MaxLength(DEFAULT_PASSWORD_MAX_LENGTH)
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(255)
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @MinLength(DEFAULT_PASSWORD_MIN_LENGTH)
  @MaxLength(DEFAULT_PASSWORD_MAX_LENGTH)
  password: string;

  @ApiProperty()
  @IsJWT()
  token: string;
}
