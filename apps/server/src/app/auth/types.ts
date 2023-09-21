import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';
const DEFAULT_PASSWORD_MIN_LENGTH = 6;
const DEFAULT_PASSWORD_MAX_LENGTH = 24;
export class LoginDto {
  @ApiProperty()
  user: string;

  @ApiProperty()
  @MinLength(DEFAULT_PASSWORD_MIN_LENGTH)
  @MaxLength(DEFAULT_PASSWORD_MAX_LENGTH)
  password: string;
}
