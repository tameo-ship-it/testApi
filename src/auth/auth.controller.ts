import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';

import type { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.appService.validateUser(
      body.email,
      body.password,
    );

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 10000,
    });

    return {
      message: 'Đăng nhập thành công',
      userName: result.userName,
      email: result.email,
      accessToken: result.accessToken,
    };
  }

  @Post('/register')
  async createUser(@Body() body: RegisterDto) {
    return this.appService.registerUser(
      body.email,
      body.password,
      body.userName,
    );
  }
}
