import { ApiProperty } from '@nestjs/swagger';
import { FindManyQueryParam } from '@server/common';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindManySettingWidgetQueryParam extends FindManyQueryParam {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  settingWidgetGroupId: string;
}

export class SettingWidgetDto {
  @ApiProperty()
  @IsString()
  settingWidgetGroupId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  link: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  icon: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sort: number;
}
