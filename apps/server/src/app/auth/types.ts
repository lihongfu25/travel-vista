import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsJWT, MaxLength, MinLength } from 'class-validator';
const DEFAULT_PASSWORD_MIN_LENGTH = 6;
const DEFAULT_PASSWORD_MAX_LENGTH = 24;
export const USER_DEFAULT_STATUS = 1;
export class LoginDto {
  @ApiProperty()
  user: string;

  @ApiProperty()
  @MinLength(DEFAULT_PASSWORD_MIN_LENGTH)
  @MaxLength(DEFAULT_PASSWORD_MAX_LENGTH)
  password: string;
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
