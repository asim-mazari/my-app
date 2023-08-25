import { Controller, Post, Body, Inject } from '@nestjs/common';
import { EmailService } from '../Services/email.service';
import {EmailDto} from '../dto/emailDto'

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() emailDto: EmailDto) {
  

    try {
        const { receiverEmail, receiverName, msgBody,senderName } = emailDto;

        await this.emailService.sendEmail(receiverEmail, receiverName, msgBody, senderName);
        return { message: 'Email sent successfully' };
      } catch (error) {
        console.error('Error sending email:', error);
        
      }
      
  }
}
