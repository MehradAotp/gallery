import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from './role.enum';
import { ApiTags } from '@nestjs/swagger';
import { createUser } from 'decorators/user/decorator.createUser';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @createUser()
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: Role = Role.USER,
  ) {
    return this.userService.register(username, password, role);
  }
}
