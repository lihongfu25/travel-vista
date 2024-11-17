import { ApiProperty } from '@nestjs/swagger';
import { FindManyQueryParam } from '@server/common';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindMenuQueryParam extends FindManyQueryParam {
  @ApiProperty()
  @IsString()
  menuName: string;
}

export class MenuItemDto {
  @ApiProperty()
  @IsString()
  label: string;

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
  parentId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  menuId: number;
}
