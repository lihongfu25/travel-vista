import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Inject,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ApiObjectResponse,
  ApiResponseService,
  ApiSuccessResponse,
  HashService,
} from '@server/common';
import {
  SERVER_CONFIGURATION,
  ServerConfigurationInterface,
  environment,
} from '@server/configuration';
import * as firebaseAdmin from 'firebase-admin';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  LoginFirebaseDto,
  RegisterDto,
  ResetPasswordDto,
  USER_DEFAULT_STATUS,
} from './types';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private response: ApiResponseService,
    private hashService: HashService,
    private authService: AuthService,
    private passwordResetService: PasswordResetService,
    @Inject(SERVER_CONFIGURATION) private config: ServerConfigurationInterface
  ) {}

  @Post('login')
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  async login(
    @Body() data: LoginDto
  ): Promise<ApiObjectResponse<{ token: string }>> {
    const username = data.user.toLocaleLowerCase();
    const user = await this.authService.repository.findOne({
      where: [{ username: username }, { email: username }],
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

  @Post('login-firebase')
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  async loginFirebase(
    @Body() data: LoginFirebaseDto
  ): Promise<ApiObjectResponse<{ token: string }>> {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(
        this.config.firebaseServiceAccount
      ),
    });
    const firebaseUser = await firebaseAdmin.auth().verifyIdToken(data.token);
    if (!firebaseUser) {
      throw new UnauthorizedException('Xác thực người dùng không thành công');
    }
    firebaseAdmin.app().delete();

    const user = await this.authService.repository.findOne({
      where: [{ email: firebaseUser.email }],
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
      const user = await this.authService.create({
        password: this.hashService.hash('123456'),
        email: firebaseUser.email,
        image: firebaseUser.phone_number,
        phoneNumber: firebaseUser.phone_number,
        verified: firebaseUser.email_verified,
        status: USER_DEFAULT_STATUS,
      });

      const userWithRoles = await this.authService.attachDefaultRole(user);
      const token = this.authService.generateToken(userWithRoles);

      return this.response.object({ token });
    }

    await this.authService.resetLoginFailed(user.id);

    const token = this.authService.generateToken(user);

    return this.response.object({ token });
  }

  @Post('register')
  @ApiUnauthorizedResponse()
  @ApiConflictResponse({ description: 'Email already exist' })
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  async register(
    @Body() data: RegisterDto
  ): Promise<ApiObjectResponse<{ token: string }>> {
    const emailLowerCase = data.email;

    if (await this.authService.isExist(emailLowerCase)) {
      throw new ConflictException('Người dùng đã tồn tại');
    }

    const user = await this.authService.create({
      password: this.hashService.hash(data.password),
      email: emailLowerCase,
      status: USER_DEFAULT_STATUS,
    });

    const userWithRoles = await this.authService.attachDefaultRole(user);

    const token = this.authService.generateToken(userWithRoles);

    return this.response.object({ token });
  }

  @Post('forgot-password')
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  async sendPasswordResetLink(
    @Body() data: ForgotPasswordDto
  ): Promise<ApiSuccessResponse> {
    const emailLowerCase = data.email.toLocaleLowerCase();
    const user = await this.authService.repository.findOne({
      where: { email: emailLowerCase },
    });

    if (!user) {
      throw new NotFoundException(
        'Không tìm thấy tài khoản nào liên kết với email này'
      );
    }

    await this.passwordResetService.expireAllToken(user.email);

    const expiresIn = 15 * 60 * 1000;

    const token = this.authService.generateToken(user, expiresIn);

    await this.passwordResetService.generate(user.email, token, expiresIn);

    return this.response.success();
  }

  @Post('reset-password')
  @ApiBadRequestResponse({ description: 'Token is expired' })
  async reset(
    @Body() data: ResetPasswordDto
  ): Promise<ApiObjectResponse<{ token: string }>> {
    const { token, password } = data;
    const passwordReset = await this.passwordResetService.repository.findOne({
      where: { token },
    });

    if (this.passwordResetService.isExpired(passwordReset)) {
      throw new BadRequestException('Token is expired');
    }
    await this.passwordResetService.expire(token);
    const user = await this.authService.repository.findOne({
      where: { email: passwordReset.user },
    });

    await this.authService.changePassword(user.id, password);

    const loginToken = this.authService.generateToken(user);

    return this.response.object({
      token: loginToken,
    });
  }
}
