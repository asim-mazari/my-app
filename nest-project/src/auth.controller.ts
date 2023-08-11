// auth.controller.ts

import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto} from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.Email);

    if (!user || user.password !== loginDto.password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // You can generate and return a token here if needed
    // For now, we'll just return a success message
    return { message: 'Login successful' };
  }
}
