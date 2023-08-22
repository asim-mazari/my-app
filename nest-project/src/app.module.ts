import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/Users'; 
import { ContactDetails } from './entity/ContactDetails';
import { UsersController } from './Controllers/users.controller';
import { UsersService } from './Services/users.service';
import { AuthController } from './Controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CorsMiddleware } from './cors.middleware';
import {CompanyInformation} from './entity/companyInformation';

import {CompanyController} from './Controllers/Company.controller';
import {companyServices} from './Services/companyservice';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'users',
      entities: [Users, ContactDetails,CompanyInformation],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([CompanyInformation]),

    JwtModule.register({
      secret: 'temporary-secret-key', // Replace with your temporary secret key
      signOptions: { expiresIn: '2h' }, // Token expiration time
    }),
  ],
  
  controllers: [CompanyController,UsersController, AuthController, ],
  providers: [UsersService, companyServices],


})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware) // Apply the CorsMiddleware
      .forRoutes('*'); // Apply to all routes, you can adjust this as needed
  }
}
