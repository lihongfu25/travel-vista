import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiCollectionResponse,
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  Auth,
  DEFAULT_LIMIT_PER_PAGE,
  HashService,
} from '@server/common';
import { UserService } from './user.service';
import { GetUserQueryParam } from './types';
import { User } from './user.entity';
import { Brackets } from 'typeorm';
import { UserTransformer } from './user.transformer';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private response: ApiResponseService,
    private userService: UserService,
    private hashService: HashService
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Danh sách người dùng. admin (roleLevel=1) & user (roleLevel=2)',
  })
  @Auth('admin')
  async getUser(
    @Query() queryParam: GetUserQueryParam
  ): Promise<
    | ApiPaginateResponse<User>
    | ApiCollectionResponse<User>
    | ApiItemResponse<User>
  > {
    const page = queryParam.page ?? 1;
    const limit = queryParam.limit ?? DEFAULT_LIMIT_PER_PAGE;
    const role = this.userService.findRoleByLevel(queryParam.roleLevel);
    if (!role) {
      throw new BadRequestException('roleLevel không tồn tại');
    }
    const query = this.userService.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('role.level = :roleLevel', { roleLevel: queryParam.roleLevel });

    if (queryParam.keyword) {
      const searchPattern = `%${queryParam.keyword}%`;
      query.andWhere(
        new Brackets((sqb) => {
          sqb
            .where('user.email LIKE :searchPattern', { searchPattern })
            .orWhere('user.username LIKE :searchPattern', { searchPattern })
            .orWhere('user.firstName LIKE :searchPattern', { searchPattern })
            .orWhere('user.lastName LIKE :searchPattern', { searchPattern });
        })
      );
    }
    const result = await this.userService.paginate(query, {
      limit,
      page,
    });
    return this.response.paginate(result, UserTransformer);
  }
}
