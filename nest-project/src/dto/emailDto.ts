import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailDto {
  @IsEmail()
  @IsNotEmpty()
  receiverEmail: string;

  @IsNotEmpty()
  receiverName: string;
  @IsNotEmpty()
  msgBody: string;
 
  @IsNotEmpty()
  senderName: string;
}
