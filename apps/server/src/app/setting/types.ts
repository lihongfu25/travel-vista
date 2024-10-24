import { ApiProperty } from '@nestjs/swagger';
import { FindManyQueryParam } from '@server/common';
import { IsOptional, IsString } from 'class-validator';

export class FindManySettingQueyryParam extends FindManyQueryParam {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  key: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category: string;
}

export class SettingDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category: string;
}
