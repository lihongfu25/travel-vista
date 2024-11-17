import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiConflictResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiCollectionResponse,
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth,
  AuthenticatedUser,
  DEFAULT_LIMIT_PER_PAGE,
  HashService,
} from '@server/common';
import { omit } from 'lodash';
import { Brackets } from 'typeorm';
import {
  CreateUserRoleDto,
  GetUserQueryParam,
  UserChangePasswordDto,
  UserDto,
  UserSensitiveData,
} from './types';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserTransformer } from './user.transformer';
import { Role } from '../role/role.entity';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private response: ApiResponseService,
    private userService: UserService,
    private hashService: HashService
  ) {}

  @Get('my-profile')
  @Auth()
  async myProfile(
    @AuthenticatedUser() user: User
  ): Promise<ApiItemResponse<User>> {
    const res = omit(user, UserSensitiveData) as User;
    res.roles = user.roles.map(({ slug }) => ({ slug } as Role));
    return this.response.item(res, UserTransformer);
  }

  @Put('my-profile')
  @Auth()
  @ApiConflictResponse({ description: 'Username already exist' })
  async userUpdate(
    @AuthenticatedUser() user: User,
    @Body() dto: UserDto
  ): Promise<ApiItemResponse<User>> {
    if (await this.userService.isUniqueUsername(dto.username)) {
      throw new ConflictException('Username đã được sử dụng');
    }
    const result = await this.userService.update(user.id, dto);
    return this.response.item(result, UserTransformer);
  }

  @Put('/change-password')
  @Auth()
  async userChangePassword(
    @AuthenticatedUser() user: User,
    @Body() data: UserChangePasswordDto
  ): Promise<ApiItemResponse<User>> {
    const result = await this.userService.update(user.id, {
      password: this.hashService.hash(data.password),
    });
    return this.response.item(result, UserTransformer);
  }

  @Get()
  @ApiOperation({
    summary: 'Danh sách người dùng. admin (roleLevel=1) & user (roleLevel=2)',
  })
  @Auth('superadmin', 'admin')
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

  @Get(':userId')
  @Auth('superadmin', 'admin')
  async show(@Param('userId') userId: string): Promise<ApiItemResponse<User>> {
    const user = await this.userService.repository.findOne({
      where: { id: userId },
      relations: {
        roles: true,
      },
    });
    return this.response.item(user, UserTransformer);
  }

  @Post('')
  @Auth('superadmin', 'admin')
  @ApiConflictResponse({ description: 'Username already exist' })
  async create(@Body() dto: UserDto): Promise<ApiItemResponse<User>> {
    if (await this.userService.isUniqueUsername(dto.username)) {
      throw new ConflictException('Username đã được sử dụng');
    }
    const result = await this.userService.create(dto);
    await this.userService.attachDefaultRole(result);
    return this.response.item(result, UserTransformer);
  }

  @Post(':userId/role')
  @Auth('superadmin', 'admin')
  async addRoleToUser(
    @Param('userId') userId: string,
    @Body() dto: CreateUserRoleDto
  ): Promise<ApiItemResponse<User>> {
    const user = await this.userService.addRoleToUser(userId, dto.roleId);
    return this.response.item(user, UserTransformer);
  }

  @Put(':userId')
  @Auth('superadmin', 'admin')
  @ApiConflictResponse({ description: 'Username already exist' })
  async update(
    @Param('userId') userId: string,
    @Body() dto: UserDto
  ): Promise<ApiItemResponse<User>> {
    if (await this.userService.isUniqueUsername(dto.username)) {
      throw new ConflictException('Username đã được sử dụng');
    }
    const result = await this.userService.update(userId, dto);
    return this.response.item(result, UserTransformer);
  }

  @Put(':userId/password')
  @Auth('superadmin', 'admin')
  async updatePassword(
    @Param('userId') userId: string,
    @Body() dto: UserChangePasswordDto
  ): Promise<ApiItemResponse<User>> {
    const result = await this.userService.update(userId, {
      password: this.hashService.hash(dto.password),
    });
    return this.response.item(result, UserTransformer);
  }

  @Delete(':userId')
  @Auth('superadmin', 'admin')
  async delete(@Param('userId') userId: string): Promise<ApiSuccessResponse> {
    await this.userService.destroy(userId);
    return this.response.success();
  }
}
