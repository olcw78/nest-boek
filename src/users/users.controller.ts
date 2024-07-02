import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VertifyEmailDto } from './dto/vertify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './entity/user-info';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly _usersSvc: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this._usersSvc.createUser(dto);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VertifyEmailDto): Promise<void> {
    console.log('verify email');
    console.log(dto);
    return;
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<void> {
    console.log(dto);
    return;
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    console.log(userId);
    return;
  }
}
