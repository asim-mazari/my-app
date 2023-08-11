import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './/entity/Users'; 
import {ContactDetails} from './/entity/ContactDetails'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'users',
      entities: [Users,ContactDetails], // Add your entity class here
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Users]),
    
  ],
  controllers: [UsersController,AuthController],
  providers: [UsersService],
 
})

export class AppModule {}
