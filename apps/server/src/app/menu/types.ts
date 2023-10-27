import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateMenuDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class CreateMenuDto extends UpdateMenuDto {
  @ApiProperty()
  @IsString()
  roleId: string;
}
