import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './/entity/Users'; 
import {ContactDetails} from './/entity/ContactDetails'
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
  ],
})

export class AppModule {}
