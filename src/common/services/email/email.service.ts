import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';


dotenv.config();


@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.APP_PASSWORD,
            },
          });
    }

    async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to,
          subject,
          text,
          html,
        };
    
        await this.transporter.sendMail(mailOptions);
      }
};