import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entity/Users';
import { CreateUserDto } from '../dto/createUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }
  async findByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { Email: email } });
  }
}
