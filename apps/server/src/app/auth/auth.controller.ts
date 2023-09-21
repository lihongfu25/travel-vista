import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import {
  ApiObjectResponse,
  ApiResponseService,
  HashService,
} from '@server/common';
import { environment } from '@server/configuration';
import { AuthService } from './auth.service';
import { LoginDto } from './types';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private response: ApiResponseService,
    private hashService: HashService,
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  @Post('login')
  @ApiUnauthorizedResponse()
  async login(
    @Body() data: LoginDto
  ): Promise<ApiObjectResponse<{ token: string }>> {
    const user = await this.authService.repository.findOne({
      where: [{ username: data.user }, { email: data.user }],
      select: [
        'id',
        'email',
        'username',
        'firstName',
        'lastName',
        'image',
        'phoneNumber',
        'password',
        'verified',
        'loginFailed',
      ],
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('Tài khoản hoặc mật khẩu không chính xác');
    }

    if (
      environment.enableLoginFailedCheck &&
      user.loginFailed >= environment.maxLoginFailed
    ) {
      throw new ForbiddenException(
        'Tài khoản của bạn đã bị khóa do đăng nhập sai quá nhiều, vui lòng liên hệ để được mở khóa tài khoản'
      );
    }

    const isValidPassword = this.hashService.check(
      data.password,
      user.password
    );

    if (!isValidPassword) {
      await this.authService.increaseLoginFailed(user.id);
      throw new BadRequestException('Tài khoản hoặc mật khẩu không chính xác');
    }

    await this.authService.resetLoginFailed(user.id);

    const token = this.authService.generateToken(user);

    return this.response.object({ token });
  }
}
