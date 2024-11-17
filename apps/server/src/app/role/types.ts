import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleLevels } from './enums';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(RoleLevels)
  @Type(() => Number)
  level: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  menuId: number;
}
