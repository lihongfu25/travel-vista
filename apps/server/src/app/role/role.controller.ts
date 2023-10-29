import { Controller, Get } from '@nestjs/common';
import {
  ApiCollectionResponse,
  ApiResponseService,
  Auth,
} from '@server/common';
import { SelectQueryBuilder } from 'typeorm';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { RoleTransformer } from './role.transformer';

@Controller('role')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private response: ApiResponseService
  ) {}

  @Get()
  @Auth('superadmin', 'admin')
  async getAllRoles(): Promise<ApiCollectionResponse<Role>> {
    const query: SelectQueryBuilder<Role> = this.roleService.repository
      .createQueryBuilder('role')
      .orderBy('role.level', 'ASC');

    const result = await query.getMany();

    return this.response.collection(result, RoleTransformer);
  }
}
