import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
@Injectable()
export class EmailService {
  async sendEmail(
    receiverEmail: string,
    receiverName: string,
    msgBody: string,
    senderName: string,
  ) {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIERECT_URL,
    );
    oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
    if (oAuth2Client.credentials.expiry_date < Date.now()) {
      // Access token has expired, refresh it using the refresh token
      const tokenResponse = await oAuth2Client.refreshAccessToken();
      oAuth2Client.setCredentials(tokenResponse.credentials);
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'asimmazari9@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: oAuth2Client.credentials.access_token,
      },
    });
    const mailOptions = {
      from: 'asimmazari9@gmail.com',
      to: receiverEmail,
      subject: 'New Email from Nest.js API',
      html: `
        <p>Hello ${receiverName},</p>
        <p>${msgBody}</p>
        <p>Best regards,</p>
        <p>${senderName}</p>
      `,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
