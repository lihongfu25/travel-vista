import { ApiProperty } from '@nestjs/swagger';
import { FindManyQueryParam } from '@server/common';
import { IsString } from 'class-validator';

export class FindMenuQueryParam extends FindManyQueryParam {
  @ApiProperty()
  @IsString()
  menuName: string;
}
