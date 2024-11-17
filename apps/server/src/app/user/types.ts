import { ApiProperty } from '@nestjs/swagger';
import { FindManyQueryParam } from '@server/common';
import { Type } from 'class-transformer';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import {
  DEFAULT_PASSWORD_MAX_LENGTH,
  DEFAULT_PASSWORD_MIN_LENGTH,
} from '../auth/types';

export class GetUserQueryParam extends FindManyQueryParam {
  @ApiProperty()
  @Type(() => Number)
  roleLevel: number;
}

export class CreateUserRoleDto {
  @ApiProperty()
  @IsString()
  roleId: string;
}

export class UserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;
}

export class UserChangePasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(DEFAULT_PASSWORD_MIN_LENGTH)
  @MaxLength(DEFAULT_PASSWORD_MAX_LENGTH)
  password: string;
}

export const UserSensitiveData = [
  'id',
  'password',
  'verifyToken',
  'verified',
  'verifiedAt',
  'loginFailed',
  'roles',
  'createdAt',
  'updatedAt',
  'deletedAt',
];
