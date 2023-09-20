import { ApiProperty } from '@nestjs/swagger';
import { FindManyQueryParam } from '@server/common';
import { Type } from 'class-transformer';

export class GetUserQueryParam extends FindManyQueryParam {
  @ApiProperty()
  @Type(() => Number)
  roleLevel: number;
}
