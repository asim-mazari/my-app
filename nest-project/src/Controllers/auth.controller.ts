import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../Services/users.service';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.Email);
    if (!user || user.password !== loginDto.password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    // Generate a JWT token with a 1-minute expiration
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' }); // Use expiresIn option

    return { message: 'Login successful', token };
  }

  @Post('check-token')
  async checkToken(@Body() { token }: { token: string }) {
    try {
      const decodedToken = this.jwtService.verify(token);
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (decodedToken.exp >= currentTimeInSeconds) {
        return { message: 'Token is valid' };
      } else {
        return { message: 'Token has expired' };
      }
    } catch (error) {
      console.error('Token verification error:', error);
      if (error.name === 'TokenExpiredError') {
        return { message: 'Token has expired' };
      }
      throw new HttpException(
        'Token verification failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
