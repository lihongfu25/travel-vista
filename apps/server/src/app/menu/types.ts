import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateMenuDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Type(() => Number)
  position: string;
}

export class CreateMenuDto extends UpdateMenuDto {
  @ApiProperty()
  @IsString()
  roleId: string;
}
