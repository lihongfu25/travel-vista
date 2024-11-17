import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMenuDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class CreateMenuDto extends UpdateMenuDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  roleId: string;
}
