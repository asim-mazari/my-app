// login.dto.ts

import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  password: string;
}
