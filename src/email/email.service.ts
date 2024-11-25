import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587, // یا 465 برای SSL
    secure: false, // true برای 465 و false برای 587
    auth: {
      user: process.env.EMAIL_USER,
      // از app password استفاده کنید
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendEmail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
  }
}
