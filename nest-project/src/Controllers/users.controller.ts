import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { UsersService } from '../Services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
@Controller('register')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Check if a user with the same email already exists
    const existingUser = await this.usersService.findByEmail(createUserDto.Email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return this.usersService.createUser(createUserDto);
  }
}
