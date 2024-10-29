import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { login } from 'decorators/auth/decorator.login';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @login()
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.login({ username, password });
  }
}
