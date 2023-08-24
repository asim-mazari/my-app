import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/Users'; 
import { ContactDetails } from './entity/ContactDetails';
import { UsersController } from './Controllers/users.controller';
import { UsersService } from './Services/users.service';
import { AuthController } from './Controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CorsMiddleware } from './cors.middleware';
<<<<<<< Updated upstream
=======
import {CompanyInformation} from './entity/companyInformation';

import {CompanyController} from './Controllers/Company.controller';
import {companyServices} from './Services/company.service';

import {EmailService} from './Services/email.service'
import {EmailController} from './Controllers/email.controller'
import { ConfigModule } from '@nestjs/config';

>>>>>>> Stashed changes


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'users',
      entities: [Users, ContactDetails],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Users]),

    JwtModule.register({
      secret: 'temporary-secret-key', // Replace with your temporary secret key
      signOptions: { expiresIn: '1m' }, // Token expiration time
    }),
  ],
<<<<<<< Updated upstream
  controllers: [UsersController, AuthController],
  providers: [UsersService],
=======
  
  controllers: [CompanyController,UsersController, AuthController,EmailController ],
  providers: [UsersService, companyServices,EmailService],


>>>>>>> Stashed changes
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware) // Apply the CorsMiddleware
      .forRoutes('*'); // Apply to all routes, you can adjust this as needed
  }
}
