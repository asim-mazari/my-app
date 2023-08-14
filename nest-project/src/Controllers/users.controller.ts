import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../Services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('register')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
