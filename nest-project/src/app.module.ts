import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/Users'; 
import { ContactDetails } from './entity/ContactDetails';
import { UsersController } from './Controllers/users.controller';
import { UsersService } from './Services/users.service';
import { AuthController } from './Controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CorsMiddleware } from './cors.middleware';


@Module({
  imports: [
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
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware) // Apply the CorsMiddleware
      .forRoutes('*'); // Apply to all routes, you can adjust this as needed
  }
}
